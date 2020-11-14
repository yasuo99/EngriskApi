using System.Collections.Generic;
using System.Threading.Tasks;
using Engrisk.Data;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;

namespace Engrisk.Controllers
{
    [Route("api/v1/[Controller]")]
    [ApiController]
    public class ExamplesController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        public ExamplesController(ICRUDRepo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]SubjectParams subjectParams){
            var examplesFromDb = await _repo.GetAll<Example>(subjectParams);
            return Ok(examplesFromDb);
        }
        [HttpGet("{exampleId}")]
        public async Task<IActionResult> GetExample(int exampleId)
        {
            var example = await _repo.GetOneWithCondition<Example>(example => example.Id == exampleId);
            if(example == null)
            {
                return NotFound();
            }
            return Ok(example);
        }

        [HttpPost]
        public async Task<IActionResult> CreateExample(Example example)
        {
            var properties = new Dictionary<dynamic,dynamic>();
            properties.Add("Eng", example.Eng);
            if(_repo.Exists<Example>(properties))
            {
                return StatusCode(409);
            }
            _repo.Create(example);
            if(await _repo.SaveAll()){
                return CreatedAtAction("GetExample", new {id = example.Id},example);
            }
            return BadRequest();
        }
        [HttpPut("{exampleId}")]
        public async Task<IActionResult> UpdateExample(int exampleId, Example example)
        {
            var exampleFromDb = await _repo.GetOneWithCondition<Example>(example => example.Id == exampleId);
            if(exampleFromDb == null)
            {
                return NotFound();
            }
            var properties = new Dictionary<dynamic,dynamic>();
            properties.Add("Eng", example.Eng);
            if(_repo.Exists<Example>(properties))
            {
                return StatusCode(409);
            }
            _repo.Update(example);
            return Ok();
        }
        [HttpDelete("{exampleId}")]
        public async Task<IActionResult> DeleteExample(int exampleId)
        {
            var exampleFromDb = await _repo.GetOneWithCondition<Example>(example => example.Id == exampleId);
            if(exampleFromDb == null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}