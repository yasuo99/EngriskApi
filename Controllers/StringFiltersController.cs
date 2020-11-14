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
    public class StringFiltersController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        public StringFiltersController(ICRUDRepo repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(SubjectParams subjectParams)
        {
            var stringFilters = await _repo.GetAll<StringFilter>(subjectParams);
            return Ok(stringFilters);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var stringFilterFromDb = await _repo.GetOneWithCondition<StringFilter>(sf => sf.Id == id);
            if (stringFilterFromDb == null)
            {
                return NotFound();
            }
            return Ok(stringFilterFromDb);
        }
        [HttpPost]
        public async Task<IActionResult> CreateStringFilter([FromBody] StringFilter stringFilter)
        {
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Word", stringFilter.Word);
            if (_repo.Exists<StringFilter>(properties))
            {
                return Conflict();
            }
            _repo.Create(stringFilter);
            if (await _repo.SaveAll())
            {
                return CreatedAtAction("GetDetail", new { id = stringFilter.Id }, stringFilter);
            }
            return StatusCode(500);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStringFilter(int id, [FromBody] StringFilter stringFilter)
        {
            var stringFilterFromDb = await _repo.GetOneWithConditionTracking<StringFilter>(filter => filter.Id == id);
            if (stringFilterFromDb == null)
            {
                return NotFound();
            }
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Word", stringFilter.Word);
            if (_repo.Exists<StringFilter>(properties))
            {
                return Conflict();
            }
            _mapper.Map(stringFilter,stringFilterFromDb);
            if(await _repo.SaveAll()){
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFilter(int id)
        {
            var stringFilterFromDb = await _repo.GetOneWithCondition<StringFilter>(filter => filter.Id == id);
            if(stringFilterFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(stringFilterFromDb);
            if(await _repo.SaveAll()){
                return NoContent();
            }
            return StatusCode(500);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteFilters()
        {
            var stringFiltersFromDb = await _repo.GetAll<StringFilter>(null,"");
            _repo.Delete(stringFiltersFromDb);
            if(await _repo.SaveAll()){
                return NoContent();
            }
            return StatusCode(500);
        }
    }
}