using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;

namespace Engrisk.Controllers
{
    [Route("api/v1/[Controller]")]
    [ApiController]
    public class WordsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        public WordsController(ICRUDRepo repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllWord([FromQuery]SubjectParams subjectParams)
        {
            var words = await _repo.GetAll<Word>(subjectParams, null, "Examples");
            return Ok(words);
        }
        [HttpGet("{wordId}")]
        public async Task<IActionResult> GetWord(int wordId)
        {
            var word = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId,"Examples,Groups");
            if (word == null)
            {
                return NotFound();
            }
            return Ok(word);
        }
        [HttpGet("search/{word}")]
        public async Task<IActionResult> SearchWord([FromQuery]SubjectParams subjectParams, string word)
        {
            return Ok(await _repo.GetAll<Word>(subjectParams, w => w.Eng.Contains(word)));
        }
        [HttpPost]
        public async Task<IActionResult> CreateWord(Word word)
        {
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Eng", word.Eng);
            if (_repo.Exists<Word>(properties))
            {
                return Conflict();
            }
            _repo.Create(word);
            if (await _repo.SaveAll())
            {
                return CreatedAtAction("GetWord", new { id = word.Id }, word);
            }
            return BadRequest("Error on creating word");
        }
        [HttpPut("{wordId}")]
        public async Task<IActionResult> UpdateWord(int wordId, Word word)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            if (wordFromDb == null)
            {
                return NotFound();
            }
            _repo.Update(word);
            if (await _repo.SaveAll())
            {
                return Ok(word);
            }
            return BadRequest("Error on updating word");
        }
        [HttpPost("{wordId}/wordexamples/{exampleId}")]
        public async Task<IActionResult> AddWordExample(int wordId, int exampleId)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            var exampleFromDb = await _repo.GetOneWithCondition<Example>(example => example.Id == exampleId);
            if (wordFromDb == null || exampleFromDb == null)
            {
                return NotFound();
            }
            var wordExample = new WordExample()
            {
                WordId = wordId,
                ExampleId = exampleId
            };
            _repo.Create(wordExample);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Error on adding example");
        }
        [HttpPut("{wordId}/wordexamples/{exampleId}")]
        public async Task<IActionResult> UpdateExample(int wordId, int exampleId, Example example)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            if (wordFromDb == null)
            {
                return NotFound(new
                {
                    NotFound = "Không tìm thấy từ"
                });
            }
            var properties = new Dictionary<dynamic,dynamic>();
            properties.Add("Eng",example.Eng);
            if(_repo.Exists<Example>(properties))
            {
                return Conflict();
            }
            var exampleFromDb = await _repo.GetOneWithCondition<Example>(e => e.Id == exampleId);
            if (exampleFromDb == null)
            {
                return NotFound(new
                {
                    NotFound = "Không tìm thấy ví dụ"
                });
            }
            _mapper.Map(example, exampleFromDb);
            var temp = exampleFromDb;
            if(await _repo.SaveAll()){
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpDelete("{wordId}")]
        public async Task<IActionResult> DeleteWord(int wordId)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            if (wordFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(wordFromDb);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("Error on deleting word");
        }
    }
}