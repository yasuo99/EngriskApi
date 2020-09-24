using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Engrisk.Data;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/quizzes")]
    public class QuizController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        public QuizController(ICRUDRepo repo)
        {
            _repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> GetAllQuizzes(SubjectParams subjectParams)
        {
            return Ok(await _repo.GetAll<Quiz>());
        }
        [HttpPost("new")]
        public async Task<IActionResult> CreateQuiz(Quiz quiz){
            _repo.Create(quiz);
            if(await _repo.SaveAll())
            {
                return Ok(quiz);
            }
            throw new Exception("Error on create new quiz");
        }   
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateQuiz(int id, Quiz quiz)
        {
            if(id != quiz.Id)
            {
                return BadRequest();
            }
            var quizFromDb = await _repo.GetOneWithCondition<Quiz>(u => u.Id == id);
            if(quizFromDb == null)
            {
                return NotFound();
            }
            _repo.Update<Quiz>(quiz);
            if(await _repo.SaveAll())
            {
                return Ok(quiz);
            }
            throw new Exception("Error on updating quiz");
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteQuiz(int id)
        {
            var quizFromDb = await _repo.GetOneWithCondition<Quiz>();
            if(quizFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete<Quiz>(quizFromDb);
            if(await _repo.SaveAll()){
                return Ok();
            }
            throw new Exception("Error on deleting quiz");
        }
    }
}
