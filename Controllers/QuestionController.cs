using System.Collections.Generic;
using System.Threading.Tasks;
using Engrisk.Data;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/questions")]
    public class QuestionController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        public QuestionController(ICRUDRepo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(SubjectParams subjectParams){
            var questions = await _repo.GetAll<Question>(subjectParams);
            Response.AddPaginationHeader(questions.CurrentPage, questions.PageSize, questions.TotalItems, questions.TotalPages);
            
        }
        [HttpPost("new")]
        public async Task<IActionResult> CreateQuestion(int id, Question question)
        {
            var quiz = await _repo.GetOneWithCondition<Quiz>(quiz => quiz.Id == id);
            if (quiz == null)
            {
                return NotFound();
            }
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Content", question.Content);
            if (_repo.Exists<Question>(properties))
            {
                return BadRequest("Already have that question");
            }
            _repo.Create(question);
            if(await _repo.SaveAll()){
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditQuestion(int id, Question question)
        {
            var questionFromDb = await _repo.GetOneWithCondition<Question>(question => question.Id == id);
            if(questionFromDb == null)
            {
                return NotFound();
            }

        }

    }
}