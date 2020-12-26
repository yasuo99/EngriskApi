using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.DTOs.Quiz;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var quizzesFromDb = await _repo.GetAll<Quiz>(null, "Section, Questions");
            var quizzes = _mapper.Map<IEnumerable<QuizDetailDTO>>(quizzesFromDb);
            return Ok(quizzes);
        }
        //Tạo quiz nhanh cho bài học từ vựng
        [HttpPost]
        public async Task<IActionResult> CreateQuiz([FromForm] QuizCreateDTO quizCreateDTO)
        {
            try
            {
                var quiz = _mapper.Map<Quiz>(quizCreateDTO);
                if (quizCreateDTO.File != null)
                {
                    var result = _cloud.UploadImage(quizCreateDTO.File);
                    if (result != null)
                    {
                        quiz.PublicId = result.PublicId;
                        quiz.QuizPhoto = result.PublicUrl;
                    };
                }
                _repo.Create(quiz);
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
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuiz(int id, [FromForm] QuizCreateDTO quiz)
        {
            var quizFromDb = await _repo.GetOneWithConditionTracking<Quiz>(u => u.Id == id);
            if (quizFromDb == null)
            {
                return NotFound(new
                {
                    Error = "Không tìm thấy quiz"
                });
            }
            _mapper.Map(quiz, quizFromDb);
            if(quiz.File != null){
                if(!string.IsNullOrEmpty(quizFromDb.PublicId)){
                    var deleteResult = _cloud.DeleteImage(quizFromDb.PublicId);
                    if(deleteResult){
                        var uploadResult = _cloud.UploadImage(quiz.File);
                        if(uploadResult != null){
                            quizFromDb.PublicId = uploadResult.PublicId;
                            quizFromDb.QuizPhoto = uploadResult.PublicUrl;
                        }
                    }
                }
            }
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            throw new Exception("Error on updating quiz");
        }
        [HttpPut("{quizId}/questions/{questionId}")]
        public async Task<IActionResult> AddQuestionToQuiz(int quizId, int questionId)
        {
            try
            {
                var quizFromDb = await _repo.GetOneWithCondition<Quiz>(u => u.Id == quizId);
                if (quizFromDb == null)
                {
                    return NotFound(new
                    {
                        Error = "Không tìm thấy quiz"
                    });
                }
                var questionFromDb = await _repo.GetOneWithCondition<Question>(q => q.Id == questionId);
                if (questionFromDb == null)
                {
                    return NotFound(new
                    {
                        Error = "Không tìm thấy câu hỏi"
                    });
                }
                var questionInQuiz = await _repo.GetOneWithCondition<QuizQuestion>(q => q.QuestionId == questionId && q.QuizId == quizId);
                if (questionInQuiz == null)
                {
                    var quizQuestion = new QuizQuestion()
                    {
                        QuizId = quizId,
                        QuestionId = questionId
                    };
                    _repo.Create(quizQuestion);
                    if (await _repo.SaveAll())
                    {
                        return Ok();
                    }
                    return NoContent();
                }
                _repo.Delete(questionInQuiz);
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz(int id)
        {
            var quizFromDb = await _repo.GetOneWithCondition<Quiz>(q => q.Id == id);
            if (quizFromDb == null)
            {
                return NotFound(new
                {
                    Error = "Không tìm thấy quiz"
                });
            }
            _repo.Delete<Quiz>(quizFromDb);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            throw new Exception("Error on deleting quiz");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> DoQuiz(int id)
        {
            var quizQuery = await _repo.GetOneWithManyToMany<Quiz>(q => q.Id == id);
            var quiz = await quizQuery.Include(q => q.Questions).ThenInclude(q => q.Question).FirstOrDefaultAsync();
            if (quiz == null)
            {
                return NotFound();
            }
            var returnQuestions = _mapper.Map<QuizDTO>(quiz);
            return Ok(returnQuestions);
        }
        [HttpPost("{id}/done")]
        public async Task<IActionResult> DoneExam(int id, List<AnswerDTO> answers)
        {
            try
            {
                var examFromDb = await _repo.GetOneWithConditionTracking<Quiz>(quiz => quiz.Id == id, "Questions");
                if (examFromDb == null)
                {
                    return NotFound();
                }
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
                }
                if (await _repo.SaveAll())
                {
                    return Ok(new
                    {
                        answers = answers
                    });
                }
                return NoContent();
            }
            catch (System.Exception e)
            {

                throw e;
            }

        }
    }
}
