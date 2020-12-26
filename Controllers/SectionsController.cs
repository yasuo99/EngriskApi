using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.DTOs.Quiz;
using Engrisk.DTOs.Section;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/v1/[Controller]")]
    public class SectionsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        private readonly CloudinaryHelper _cloud;
        public SectionsController(ICRUDRepo repo, IMapper mapper, IOptions<CloudinarySettings> cloudSettings)
        {
            _mapper = mapper;
            _repo = repo;
            _cloud = new CloudinaryHelper(new CloudinaryDotNet.Account()
            {
                ApiKey = cloudSettings.Value.ApiKey,
                ApiSecret = cloudSettings.Value.ApiSecret,
                Cloud = cloudSettings.Value.CloudName
            });
        }
        [HttpGet]
        public async Task<IActionResult> GetSections([FromQuery] SubjectParams subjectParams)
        {
            var sections = await _repo.GetAll<Section>(subjectParams, includeProperties: "Quizzes");
            var returnSections = _mapper.Map<IEnumerable<SectionDTO>>(sections);
            if (User.FindFirst(ClaimTypes.NameIdentifier) != null)
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                foreach (var section in returnSections)
                {
                    var done = await _repo.GetOneWithCondition<AccountSection>(a => a.AccountId == userId && a.SectionId == section.Id);
                    if (done != null)
                    {
                        section.DPA = done.QuizDoneCount;
                    }
                }
            }
            return Ok(returnSections);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var sectionFromDb = await _repo.GetOneWithConditionTracking<Section>(section => section.Id == id, "Quizzes");
            if (sectionFromDb == null)
            {
                return NotFound();
            }
            return Ok(sectionFromDb);
        }
        [HttpPost]
        public async Task<IActionResult> CreateSection([FromForm] SectionCreateDTO sectionDTO)
        {
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("SectionName", sectionDTO.SectionName);
            if (_repo.Exists<Section>(properties))
            {
                return Conflict(new
                {
                    Error = "Section đã tồn tại"
                });
            }
            var section = _mapper.Map<Section>(sectionDTO);
            var result = _cloud.UploadImage(sectionDTO.File);
            if (result != null)
            {
                section.PhotoUrl = result.PublicUrl;
                section.PublicId = result.PublicId;
            }
            _repo.Create(section);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPost("{id}/quizzes")]
        public async Task<IActionResult> CreateQuiz(int id, [FromForm] QuizCreateDTO quizDTO)
        {
            try
            {
                var sectionFromDb = await _repo.GetOneWithCondition<Section>(section => section.Id == id);
                if (sectionFromDb == null)
                {
                    return NotFound();
                }
                Quiz quiz = new Quiz();
                quiz = _mapper.Map(quizDTO, quiz);
                var result = _cloud.UploadImage(quizDTO.File);
                if (result != null)
                {
                    quiz.PublicId = result.PublicId;
                    quiz.QuizPhoto = result.PublicUrl;
                };
                _repo.Create(quiz);
                quiz.Section = sectionFromDb;
                if (await _repo.SaveAll())
                {
                    return Ok();
                }
                throw new Exception("Error on create new quiz to section " + sectionFromDb.Id);
            }
            catch (System.Exception e)
            {

                throw e;
            }

        }
        [HttpDelete("{sectionId}/quizzes/{quizId}")]
        public async Task<IActionResult> DeleteQuizFromSection(int sectionId, int quizId)
        {
            var sectionFromDb = await _repo.GetOneWithCondition<Section>(section => section.Id == sectionId);
            var quizFromDb = await _repo.GetOneWithCondition<Quiz>(quiz => quiz.Id == quizId && quiz.SectionId == sectionId);
            if (quizFromDb == null || sectionFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(quizFromDb);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return NoContent();
        }
        [HttpGet("{sectionId}/quizzes")]
        public async Task<IActionResult> GetAllQuizzes(int sectionId)
        {
            var sectionFromDb = await _repo.GetOneWithManyToMany<Section>(section => section.Id == sectionId);
            var section = await sectionFromDb.Include(q => q.Quizzes).ThenInclude(q => q.Questions).FirstOrDefaultAsync();
            if (section == null)
            {
                return NotFound();
            }
            var returnQuizzes = _mapper.Map<IEnumerable<QuizDetailDTO>>(section.Quizzes);
            return Ok(returnQuizzes);
        }
        [HttpGet("{sectionId}/do")]
        public async Task<IActionResult> DoQuiz(int sectionId, [FromQuery] int currentQuiz = 0)
        {
            if (await _repo.GetOneWithKey<Section>(sectionId) == null)
            {
                return NotFound(new
                {
                    Error = "Không tìm thấy bài học"
                });
            }
            var sectionFromDb = await _repo.GetOneWithManyToMany<Section>(sec => sec.Id == sectionId);
            var section = await sectionFromDb.Include(s => s.Quizzes).Include(s => s.Accounts).FirstOrDefaultAsync();
            if (User.FindFirst(ClaimTypes.NameIdentifier) != null)
            {

                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var accountSection = await _repo.GetOneWithConditionTracking<AccountSection>(s => s.AccountId == userId && s.SectionId == sectionId);
                if (accountSection == null)
                {
                    var accountSec = new AccountSection()
                    {
                        AccountId = userId,
                        SectionId = sectionId,
                        Start_At = DateTime.Now
                    };
                    _repo.Create(accountSec);
                }
                var quizDone = section.Accounts.Where(s => s.AccountId == userId).FirstOrDefault();
                var newQuiz = section.Quizzes.Skip(quizDone == null ? 0 : quizDone.QuizDoneCount).Take(1).FirstOrDefault();
                if (newQuiz == null)
                {
                    var randomQuiz = section.Quizzes.GetOneRandomFromList();
                    var oldQuizHistory = new History()
                    {
                        AccountId = userId,
                        QuizId = randomQuiz.Id,
                        StartDate = DateTime.Now,
                        IsDone = false
                    };
                    _repo.Create(oldQuizHistory);
                    await _repo.SaveAll();
                    var quizQuery = await _repo.GetOneWithManyToMany<Quiz>(quiz => quiz.Id == randomQuiz.Id);
                    var quizQuestions = await quizQuery.Include(e => e.Questions).ThenInclude(q => q.Question).FirstOrDefaultAsync();
                    var questions = _mapper.Map<QuizDTO>(quizQuestions);

                    // var examFromDb = await _repo.GetOneWithManyToMany<Section>(quiz => quiz.Id == quizId);
                    // var exam = await examFromDb.Include(e => e.Questions).ThenInclude(q => q.Question).FirstOrDefaultAsync();
                    // var returnQuestions = _mapper.Map<QuizDTO>(exam);
                    return Ok(questions);
                }
                var userQuizQuery = await _repo.GetOneWithManyToMany<Quiz>(quiz => quiz.Id == newQuiz.Id);
                var userQuiz = await userQuizQuery.Include(e => e.Questions).ThenInclude(q => q.Question).FirstOrDefaultAsync();
                var returnQuiz = _mapper.Map<QuizDTO>(userQuiz);
                var history = new History()
                {
                    AccountId = userId,
                    QuizId = userQuiz.Id,
                    StartDate = DateTime.Now,
                    IsDone = false
                };
                _repo.Create(history);
                await _repo.SaveAll();
                return Ok(returnQuiz);
            }
            var anonymousQuiz = section.Quizzes.Skip(currentQuiz).Take(1).FirstOrDefault();
            if (anonymousQuiz == null)
            {
                return NotFound();
            }
            var examFromDb = await _repo.GetOneWithManyToMany<Quiz>(quiz => quiz.Id == anonymousQuiz.Id);
            var exam = await examFromDb.Include(e => e.Questions).ThenInclude(q => q.Question).FirstOrDefaultAsync();
            var returnQuestions = _mapper.Map<QuizDTO>(exam);

            // var examFromDb = await _repo.GetOneWithManyToMany<Section>(quiz => quiz.Id == quizId);
            // var exam = await examFromDb.Include(e => e.Questions).ThenInclude(q => q.Question).FirstOrDefaultAsync();
            // var returnQuestions = _mapper.Map<QuizDTO>(exam);
            return Ok(returnQuestions);
        }
        [HttpPost("{sectionId}/quizzes/{quizId}/done")]
        public async Task<IActionResult> DoneQuiz(int sectionId, int quizId)
        {
            var sectionFromDb = await _repo.GetOneWithCondition<Section>(s => s.Id == sectionId, includeProperties: "Quizzes");
            if (!sectionFromDb.Quizzes.Any(q => q.Id == quizId))
            {
                return BadRequest(new
                {
                    Error = "Quiz này không thuộc section này"
                });
            }
            var examFromDb = await _repo.GetOneWithConditionTracking<Quiz>(quiz => quiz.Id == quizId, "Questions");
            if (examFromDb == null)
            {
                return NotFound();
            }
            if (User.FindFirst(ClaimTypes.NameIdentifier) != null)
            {
                var accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var historyFromDb = await _repo.GetOneWithConditionTracking<History>(history => history.QuizId == quizId && history.AccountId == accountId && history.IsDone == false);
                historyFromDb.DoneDate = DateTime.Now;
                historyFromDb.TimeSpent = (int)Math.Round(DateTime.Now.MinusDate(historyFromDb.StartDate));
                historyFromDb.IsDone = true;
                var accountSection = await _repo.GetOneWithConditionTracking<AccountSection>(s => s.AccountId == accountId && s.SectionId == sectionId);
                if (accountSection.QuizDoneCount < sectionFromDb.Quizzes.Count())
                {
                    accountSection.QuizDoneCount += 1;
                }
                if (await _repo.SaveAll())
                {
                    return Ok(historyFromDb);
                }
                else
                {
                    return NoContent();
                }
            }

            return NoContent();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditSection(int id, [FromForm] SectionUpdateDTO section)
        {
            var sectionFromDb = await _repo.GetOneWithConditionTracking<Section>(section => section.Id == id);
            if (sectionFromDb == null)
            {
                return NotFound();
            }
            _mapper.Map(section, sectionFromDb);
            if (section.File != null)
            {
                if (!string.IsNullOrEmpty(sectionFromDb.PublicId))
                {
                    var deleteResult = _cloud.DeleteImage(sectionFromDb.PublicId);
                    if (deleteResult)
                    {
                        var uploadResult = _cloud.UploadImage(section.File);
                        if (uploadResult != null)
                        {
                            sectionFromDb.PublicId = uploadResult.PublicId;
                            sectionFromDb.PhotoUrl = uploadResult.PublicUrl;
                        }
                    }
                }
            }
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPut("{id}/require-login")]
        public async Task<IActionResult> SetRequireLogin(int id)
        {
            try
            {
                var sectionFromDb = await _repo.GetOneWithConditionTracking<Section>(section => section.Id == id);
                if (sectionFromDb == null)
                {
                    return NotFound();
                }
                sectionFromDb.RequireLogin = sectionFromDb.RequireLogin ? false : true;
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
        public async Task<IActionResult> DeleteSection(int id)
        {
            try
            {
                var sectionFromDb = await _repo.GetOneWithCondition<Section>(section => section.Id == id);
                if (sectionFromDb == null)
                {
                    return NotFound();
                }
                _repo.Delete(sectionFromDb);
                if (await _repo.SaveAll())
                {
                    return NoContent();
                }
                return StatusCode(500);
            }
            catch (System.Exception e)
            {

                throw e;
            }

        }
    }
}