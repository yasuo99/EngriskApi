using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/v1/[Controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        public QuestionsController(ICRUDRepo repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]SubjectParams subjectParams)
        {
            var questions = await _repo.GetAll<Question>(subjectParams);
            Response.AddPaginationHeader(questions.CurrentPage, questions.PageSize, questions.TotalItems, questions.TotalPages);
            return Ok(questions);
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
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Error on create question");
        }
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditQuestion(int id, Question question)
        {
            var questionFromDb = await _repo.GetOneWithCondition<Question>(question => question.Id == id);
            if (questionFromDb == null)
            {
                return NotFound();
            }
            _mapper.Map(questionFromDb,question);
            if(await _repo.SaveAll()){
                return Ok();
            }
            return BadRequest("Error on updating question");
        }

    }
}