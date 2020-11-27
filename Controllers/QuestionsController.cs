using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Engrisk.Services;
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
        public async Task<IActionResult> GetAll([FromQuery] SubjectParams subjectParams)
        {
            var questions = await _repo.GetAll<Question>(subjectParams);
            Response.AddPaginationHeader(questions.CurrentPage, questions.PageSize, questions.TotalItems, questions.TotalPages);
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
            var returnQuestion = _mapper.Map<QuestionDTO>(questionFromDb);
            return Ok(returnQuestion);
        }
        [HttpPost("new")]
        public async Task<IActionResult> CreateQuestion([FromForm] QuestionDTO questionDTO)
        {
            var quiz = await _repo.GetOneWithCondition<Quiz>(quiz => quiz.Id == questionDTO.QuizId);
            if (quiz == null)
            {
                return NotFound();
            }
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Content", questionDTO.Content);
            if (_repo.Exists<Question>(properties))
            {
                return Conflict();
            }
            var question = _mapper.Map<Question>(questionDTO);
            var result = _helper.UploadImage(questionDTO.File);
            if (result != null)
            {
                question.PhotoUrl = result.PublicUrl;
                question.PublicId = result.PublicId;
            }
            var uploadResult = await _dropBox.UploadFile(questionDTO.Audio, "/Engrisk");
            if(uploadResult != null){
                question.Content = uploadResult.SharedUrl;
                _repo.Create(question);
            }   
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Error on create question");
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
            return Ok(answer);
        }
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditQuestion(int id, Question question)
        {
            var questionFromDb = await _repo.GetOneWithCondition<Question>(question => question.Id == id);
            if (questionFromDb == null)
            {
                return NotFound();
            }
            _mapper.Map(questionFromDb, question);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Error on updating question");
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