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
    public class WordsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        public WordsController(ICRUDRepo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllWord(SubjectParams subjectParams){
            var words = await _repo.GetAll<Word>(subjectParams,null, "Examples");
            return Ok(words);
        }
        [HttpGet("{wordId}")]
        public async Task<IActionResult> GetWord(int wordId){
            var word = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            if(word == null)
            {
                return NotFound();
            }
            return Ok(word);
        }
        [HttpGet("search/{word}")]
        public async Task<IActionResult> SearchWord(SubjectParams subjectParams, string word)
        {
            return Ok(await _repo.GetAll<Word>(subjectParams, w => w.Eng.Contains(word)));
        }
        [HttpPost]
        public async Task<IActionResult> CreateWord(Word word)
        {
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Eng", word.Eng);
            if(_repo.Exists<Word>(properties)){
                return BadRequest("Already exist");
            }
            _repo.Create(word);
            if(await _repo.SaveAll()){
                return CreatedAtAction("GetWord", new {id = word.Id}, word);
            }
            return BadRequest("Error on creating word");
        }
        [HttpPut("{wordId}")]
        public async Task<IActionResult> UpdateWord(int wordId, Word word){
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            if(wordFromDb == null){
                return NotFound();
            }
            _repo.Update(word);
            if(await _repo.SaveAll()){
                return Ok(word);
            }
            return BadRequest("Error on updating word");
        }
        [HttpPut("{wordId}/addexample/{exampleId}")]
        public async Task<IActionResult> AddWordExample(int wordId, int exampleId)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            var exampleFromDb = await _repo.GetOneWithCondition<Example>(example => example.Id == exampleId);
            if(wordFromDb == null || exampleFromDb == null)
            {
                return NotFound();
            }
            var wordExample = new WordExample(){
                WordId = wordId,
                ExampleId = exampleId
            };
            _repo.Create(wordExample);
            if(await _repo.SaveAll()){
                return Ok();
            }
            return BadRequest("Error on adding example");
        }

        [HttpDelete("{wordID}")]
        public async Task<IActionResult> DeleteWord(int wordId)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            if(wordFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(wordFromDb);
            if(await _repo.SaveAll()){
                return Ok();
            }
            return BadRequest("Error on deleting word");
        }
    }
}