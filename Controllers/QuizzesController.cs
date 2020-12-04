using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/v1/[Controller]")]
    public class QuizzesController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        private readonly CloudinaryHelper _cloud;
        public QuizzesController(ICRUDRepo repo, IMapper mapper, IOptions<CloudinarySettings> cloudinarySettings)
        {
            _mapper = mapper;
            _repo = repo;
            var account = new CloudinaryDotNet.Account()
            {
                ApiKey = cloudinarySettings.Value.ApiKey,
                ApiSecret = cloudinarySettings.Value.ApiSecret,
                Cloud = cloudinarySettings.Value.CloudName
            };
            _cloud = new CloudinaryHelper(account);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllQuizzes([FromQuery] SubjectParams subjectParams)
        {
            return Ok(await _repo.GetAll<Quiz>(subjectParams, null, ""));
        }
        [HttpPost]
        public async Task<IActionResult> CreateQuiz([FromForm] QuizDTO quizDTO)
        {
            Quiz quiz = new Quiz();
            quiz = _mapper.Map(quizDTO, quiz);
            var result = _cloud.UploadImage(quizDTO.File);
            if (result != null)
            {
                quiz.PublicId = result.PublicId;
                quiz.QuizPhoto = result.PublicUrl;
            };
            _repo.Create(quiz);
            if (await _repo.SaveAll())
            {
                return Ok(quiz);
            }
            throw new Exception("Error on create new quiz");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuiz(int id, Quiz quiz)
        {
            if (id != quiz.Id)
            {
                return BadRequest();
            }
            var quizFromDb = await _repo.GetOneWithCondition<Quiz>(u => u.Id == id);
            if (quizFromDb == null)
            {
                return NotFound();
            }
            _repo.Update<Quiz>(quiz);
            if (await _repo.SaveAll())
            {
                return Ok(quiz);
            }
            throw new Exception("Error on updating quiz");
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteQuiz(int id)
        {
            var quizFromDb = await _repo.GetOneWithCondition<Quiz>();
            if (quizFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete<Quiz>(quizFromDb);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            throw new Exception("Error on deleting quiz");
        }
        [HttpGet("{id}/do")]
        public async Task<IActionResult> DoExam(int id)
        {
            var examFromDb = await _repo.GetOneWithConditionTracking<Quiz>(quiz => quiz.Id == id, "Questions");
            if (examFromDb == null)
            {
                return NotFound();
            }
            var returnQuestions = _mapper.Map<ExamDTO>(examFromDb);
            if (User.FindFirst(ClaimTypes.NameIdentifier) != null)
            {
                var history = new History()
                {
                    AccountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value),
                    QuizId = id,
                    StartDate = DateTime.Now,
                    IsDone = false
                };
                _repo.Create(history);
                await _repo.SaveAll();
            }
            return Ok(returnQuestions);
        }
        [HttpPost("{id}/done")]
        public async Task<IActionResult> DoneExam(int id, List<AnswerDTO> answers)
        {
            var examFromDb = await _repo.GetOneWithConditionTracking<Quiz>(quiz => quiz.Id == id, "Questions");
            if (examFromDb == null)
            {
                return NotFound();
            }
            int score = 0;
            foreach (var answer in answers)
            {
                var question = examFromDb.Questions.FirstOrDefault(question => question.QuestionId == answer.Id);
                if (answer.Answer.Equals(question.Question.Answer))
                {
                    answer.IsRightAnswer = true;
                }
                else
                {
                    answer.IsRightAnswer = false;
                }
            }
            if (score >= examFromDb.PassScore)
            {

                if (User.FindFirst(ClaimTypes.NameIdentifier) != null)
                {
                    var accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                    var accountFromDb = await _repo.GetOneWithConditionTracking<Account>(acc => acc.Id == accountId);
                    var item = await _repo.GetOneWithCondition<AccountStorage>(store => store.AccountId == accountId && store.IsUsing == true, "Item");
                    switch (item.Item.ItemName.ToLower())
                    {
                        case "x2 exp":
                            accountFromDb.Exp += examFromDb.ExpGain * 2;
                            break;
                        default:
                            accountFromDb.Exp += examFromDb.ExpGain;
                            break;
                    }

                    var historyFromDb = await _repo.GetOneWithConditionTracking<History>(history => history.QuizId == id && history.AccountId == accountFromDb.Id && history.IsDone == false);
                    historyFromDb.DoneDate = DateTime.Now;
                    historyFromDb.TimeSpent = (int)Math.Round(DateTime.Now.MinusDate(historyFromDb.StartDate));
                    historyFromDb.IsDone = true;
                    historyFromDb.Score = score;
                }
            }
            if (await _repo.SaveAll())
            {
                return Ok(new
                {
                    score = score,
                    answers = answers
                });
            }
            return StatusCode(500);
        }
    }
}
