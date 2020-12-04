
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/v1/[Controller]")]
    public class ExamsController: ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        public ExamsController(ICRUDRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllExam([FromQuery] SubjectParams subjectParams){
            var examsFromDb = await _repo.GetAll<Exam>(subjectParams);
            var returnExams = _mapper.Map<IEnumerable<ExamDTO>>(examsFromDb);
            Response.AddPaginationHeader(examsFromDb.CurrentPage, examsFromDb.PageSize, examsFromDb.TotalItems, examsFromDb.TotalPages);
            return Ok(returnExams);
        }
    }
}