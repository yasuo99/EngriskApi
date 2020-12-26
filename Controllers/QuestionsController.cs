using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.DTOs.Question;
using Engrisk.Helper;
using Engrisk.Models;
using Engrisk.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/v1/[Controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        private readonly CloudinaryHelper _helper;
        private readonly IUploadService _dropBox;
        private readonly IConfiguration _config;
        public QuestionsController(ICRUDRepo repo, IMapper mapper, IOptions<CloudinarySettings> cloudSetting, IUploadService dropBox, IConfiguration config)
        {
            _dropBox = dropBox;
            var account = new CloudinaryDotNet.Account()
            {
                ApiSecret = cloudSetting.Value.ApiSecret,
                ApiKey = cloudSetting.Value.ApiKey,
                Cloud = cloudSetting.Value.CloudName
            };
            _helper = new CloudinaryHelper(account);
            _mapper = mapper;
            _repo = repo;
            _config = config;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SubjectParams subjectParams, [FromQuery] string type = null, [FromQuery] string category = "exam")
        {
            var questions = await _repo.GetAll<Question>(null, "");
            if (type != null)
            {
                switch (type)
                {
                    case "reading":
                        switch (category)
                        {
                            case "exam":
                                var readingExamQuestions = questions.Where(q => q.IsFillOutQuestion && q.IsQuizQuestion == false).ToList();
                                return Ok(readingExamQuestions);
                            case "quiz":
                                var readingQuizQuestions = questions.Where(q => q.IsListeningQuestion == false && q.IsQuizQuestion).ToList();
                                return Ok(readingQuizQuestions);
                            default:
                                break;
                        }
                        break;
                    case "listening":
                        switch (category)
                        {
                            case "exam":
                                var listeningExamQuestions = questions.Where(q => q.IsListeningQuestion && q.IsQuizQuestion == false).ToList();
                                return Ok(listeningExamQuestions);
                            case "quiz":
                                var listeningQuizQuestions = questions.Where(q => q.IsListeningQuestion && q.IsQuizQuestion).ToList();
                                return Ok(listeningQuizQuestions);
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }
            return Ok(questions);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion(int id)
        {
            var questionFromDb = await _repo.GetOneWithConditionTracking<Question>(question => question.Id == id, "");
            if (questionFromDb == null)
            {
                return NotFound();
            }
            var returnQuestion = _mapper.Map<QuestionDetailDTO>(questionFromDb);
            return Ok(returnQuestion);
        }
        [HttpPost]
        public async Task<IActionResult> CreateQuestion([FromForm] QuestionCreateDTO questionDTO)
        {
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Content", questionDTO.Content);
            if (_repo.Exists<Question>(properties))
            {
                return Conflict();
            }
            var question = _mapper.Map<Question>(questionDTO);
            if (questionDTO.File != null)
            {
                var result = _helper.UploadImage(questionDTO.File);
                if (result != null)
                {
                    question.PhotoUrl = result.PublicUrl;
                    question.PublicId = result.PublicId;
                }
            }
            if (questionDTO.Audio != null)
            {
                var uploadResult = await _dropBox.UploadFile(questionDTO.Audio, "/Engrisk");
                if (uploadResult != null)
                {
                    question.Audio = uploadResult.SharedUrl;
                }
            }
            _repo.Create(question);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Error on create question");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, [FromForm] QuestionCreateDTO questionCreateDTO)
        {
            try
            {
                var questionFromDb = await _repo.GetOneWithConditionTracking<Question>(q => q.Id == id);
                if (questionFromDb == null)
                {
                    return NotFound(new
                    {
                        Error = "Không tìm thấy câu hỏi"
                    });
                }
                _mapper.Map(questionCreateDTO, questionFromDb);
                if (questionCreateDTO.File != null)
                {
                    if (!string.IsNullOrEmpty(questionFromDb.PublicId))
                    {
                        var deleteResult = _helper.DeleteImage(questionFromDb.PublicId);
                        if (deleteResult)
                        {
                            var uploadResult = _helper.UploadImage(questionCreateDTO.File);
                            if (uploadResult != null)
                            {
                                questionFromDb.PublicId = uploadResult.PublicId;
                                questionFromDb.PhotoUrl = uploadResult.PublicUrl;
                            }
                        }
                    }
                }
                if (questionCreateDTO.Audio != null)
                {
                    var uploadResult = await _dropBox.UploadFile(questionCreateDTO.Audio, "/Engrisk");
                    if (uploadResult != null)
                    {
                        questionFromDb.Audio = uploadResult.SharedUrl;
                    }
                }
                if (await _repo.SaveAll())
                {
                    return Ok();
                }
                return NoContent();
            }
            catch (System.Exception e)
            {

                throw e;
            }

        }
        [HttpPost("{questionId}/check")]
        public async Task<IActionResult> CheckAnswer(int questionId, [FromBody] AnswerDTO answer)
        {
            if (questionId != answer.Id)
            {
                return NotFound();
            }
            var questionFromDb = await _repo.GetOneWithCondition<Question>(q => q.Id == questionId);
            if (questionFromDb == null)
            {
                return NotFound();
            }
            if (questionFromDb.Answer == answer.Answer)
            {
                answer.IsRightAnswer = true;
            }
            if (User.FindFirst(ClaimTypes.NameIdentifier) != null)
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var wordFromDb = await _repo.GetOneWithCondition<Word>(w => w.Eng.Equals(questionFromDb.Content) || w.Vie.Equals(questionFromDb.Content) || w.Eng.Equals(questionFromDb.Answer) || w.Vie.Equals(questionFromDb.Answer));
                if (wordFromDb != null)
                {
                    var learntFromDb = await _repo.GetOneWithConditionTracking<WordLearnt>(w => w.WordId == wordFromDb.Id && w.AccountId == userId);
                    if (learntFromDb == null)
                    {
                        var wordLearnt = new WordLearnt()
                        {
                            AccountId = userId,
                            WordId = wordFromDb.Id,
                            LastPractice = DateTime.Now
                        };
                        _repo.Create(wordLearnt);
                    }
                    else
                    {
                        learntFromDb.LastPractice = DateTime.Now;
                    }

                }

                await _repo.SaveAll();
            }
            return Ok(answer);
        }
        [HttpPost("import-excel")]
        public async Task<IActionResult> ImportExcel([FromQuery] string sheet, [FromForm] IFormFile file)
        {

            if (file.Length > 0)
            {
                var extension = Path.GetExtension(file.FileName);
                if (extension.Equals(".csv") || extension.Equals(".xlsx"))
                {
                    var result = await file.ReadExcel();
                    var dataTable = result.Tables[sheet];
                    if (dataTable != null)
                    {
                        foreach (DataRow row in dataTable.Rows)
                        {
                            var question = new Question();
                            question.PhotoUrl = row["PhotoUrl"] == DBNull.Value ? null : (string)row["PhotoUrl"];
                            question.PublicId = row["PublicId"] == DBNull.Value ? null : (string)row["PublicId"];
                            question.Filename = row["Filename"] == DBNull.Value ? null : (string)row["Filename"];
                            question.Audio = row["Audio"] == DBNull.Value ? null : (string)row["Audio"];
                            question.ToeicPart = row["ToeicPart"] == DBNull.Value ? 0 : (int)(Math.Round((double)row["ToeicPart"], MidpointRounding.AwayFromZero));
                            question.Content = row["Content"] == DBNull.Value ? null : (string)row["Content"];
                            question.A = row["A"] == DBNull.Value ? null : (string)row["A"];
                            question.B = row["B"] == DBNull.Value ? null : (string)row["B"];
                            question.C = row["C"] == DBNull.Value ? null : (string)row["C"];
                            question.D = row["D"] == DBNull.Value ? null : (string)row["D"];
                            question.Answer = row["Answer"] == DBNull.Value ? null : (string)row["Answer"];
                            question.Explaination = row["Explaination"] == DBNull.Value ? null : (string)row["Explaination"];
                            question.IsListeningQuestion = row["IsListeningQuestion"] == DBNull.Value ? false : (bool)row["IsListeningQuestion"];
                            question.IsFillOutQuestion = row["IsFillOutQuestion"] == DBNull.Value ? false : (bool)row["IsFillOutQuestion"];
                            question.IsConcatQuestion = row["IsConcatQuestion"] == DBNull.Value ? false : (bool)row["IsConcatQuestion"];
                            question.IsQuizQuestion = row["IsQuizQuestion"] == DBNull.Value ? false : (bool)row["IsQuizQuestion"];
                            question.Inserted = DateTime.Now;
                            _repo.Create(question);
                        }
                        if (await _repo.SaveAll())
                        {
                            return Ok();
                        }
                        else
                        {
                            return NoContent();
                        }
                    }
                }

            }
            return NoContent();

        }
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditQuestion(int id, [FromForm] QuestionCreateDTO question)
        {
            var questionFromDb = await _repo.GetOneWithConditionTracking<Question>(question => question.Id == id);
            if (questionFromDb == null)
            {
                return NotFound();
            }
            _mapper.Map(question, questionFromDb);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            else
            {
                return NoContent();
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var questionFromDb = await _repo.GetOneWithCondition<Question>(ques => ques.Id == id);
            if (questionFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(questionFromDb);
            if (await _repo.SaveAll())
            {
                _helper.DeleteImage(questionFromDb.PublicId);
                return Ok();
            }
            return StatusCode(500);
        }

    }
}