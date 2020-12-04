using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Engrisk.Controllers
{
    [Route("api/v1/[Controller]")]
    [ApiController]
    public class WordsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        private readonly CloudinaryHelper _cloud;
        public WordsController(ICRUDRepo repo, IMapper mapper, IOptions<CloudinarySettings> cloudinarySettings)
        {
            var cloudAccount = new CloudinaryDotNet.Account()
            {
                ApiKey = cloudinarySettings.Value.ApiKey,
                ApiSecret = cloudinarySettings.Value.ApiSecret,
                Cloud = cloudinarySettings.Value.CloudName
            };
            _mapper = mapper;
            _repo = repo;
            _cloud = new CloudinaryHelper(cloudAccount);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllWord([FromQuery] SubjectParams subjectParams)
        {
            var words = await _repo.GetAll<Word>(expression: null, includeProperties: "Examples",orderBy: null);
            return Ok(words);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWord(int id)
        {
            var word = new Word();

            if (User.FindFirst(ClaimTypes.NameIdentifier) != null)
            {
                if (User.IsInRole("learner"))
                {
                    word = await _repo.GetOneWithConditionTracking<Word>(word => word.Id == id, "Examples");
                }
                if (User.IsInRole("admin") || User.IsInRole("manager"))
                {
                    word = await _repo.GetOneWithConditionTracking<Word>(word => word.Id == id, "Examples,Groups");
                }
            }
            if (word == null)
            {
                return NotFound();
            }
            return Ok(word);
        }
        [HttpGet("search/{word}")]
        public async Task<IActionResult> SearchWord([FromQuery] SubjectParams subjectParams, string word)
        {
            var words = await _repo.GetAll<Word>(subjectParams, w => w.Eng.Contains(word));
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> CreateWord([FromForm] WordDTO wordDTO)
        {
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Eng", wordDTO.Eng);
            if (_repo.Exists<Word>(properties))
            {
                return Conflict();
            }
            var word = _mapper.Map<Word>(wordDTO);
            var result = _cloud.UploadImage(wordDTO.File);
            if (result != null)
            {
                word.WordImg = result.PublicUrl;
                word.PublicId = result.PublicId;
            }
            _repo.Create(word);
            if (await _repo.SaveAll())
            {
                return CreatedAtAction("GetWord", new { id = word.Id }, word);
            }
            return BadRequest("Error on creating word");
        }
        [HttpPost("import-json")]
        public async Task<IActionResult> ImportFromJson([FromForm] IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    if (file.ContentType.ToLower().Equals("application/json"))
                    {
                        var words = new List<Word>();
                        var result = await file.DeserializeJson();
                        foreach (var jToken in result)
                        {
                            var word = new Word()
                            {
                                WordCategory = (string)jToken["wordCategory"],
                                WordImg = (string)jToken["wordImg"],
                                PublicId = (string)jToken["publicId"],
                                Eng = (string)jToken["eng"],
                                Vie = (string)jToken["vie"],
                                Spelling = (string)jToken["spelling"]
                            };
                            var wordFromDb = await _repo.GetOneWithCondition<Word>(w => w.Eng.ToLower().Trim().Equals(word.Eng.ToLower().Trim()));
                            if (wordFromDb == null)
                            {
                                words.Add(word);
                                _repo.Create(word);
                            }
                        }
                        if (await _repo.SaveAll())
                        {
                            return Ok(words);
                        }
                        else
                        {
                            return NoContent();
                        }
                    }
                    return BadRequest(new
                    {
                        error = "File not supported"
                    });

                }
                return NoContent();
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
        [HttpPost("import-excel")]
        public async Task<IActionResult> ImportExcel([FromForm] IFormFile file)
        {
            if (file.Length > 0)
            {
                var extension = Path.GetExtension(file.FileName);
                if (extension.Equals(".csv") || extension.Equals(".xlsx"))
                {
                    var result = await file.ReadExcel();
                    if (result != null)
                    {
                        var words = new List<Word>();
                        var temp = result.Tables["Sheet1"];
                        if (temp != null)
                        {
                            foreach (DataRow row in temp.Rows)
                            {
                                var word = new Word()
                                {
                                    Eng = row["Eng"] == DBNull.Value ? null : (string)row["Eng"],
                                    Vie = row["Vie"] == DBNull.Value ? null : (string)row["Vie"],
                                    Spelling = row["Spelling"] == DBNull.Value ? null : (string)row["Spelling"],
                                    PublicId = row["PublicId"] == DBNull.Value ? null : (string)row["PublicId"],
                                    WordImg = row["WordImg"] == DBNull.Value ? null : (string)row["WordImg"],
                                    WordCategory = row["WordCategory"] == DBNull.Value ? null : (string)row["WordCategory"]
                                };
                                var wordFromDb = await _repo.GetOneWithCondition<Word>(w => w.Eng.ToLower().Trim().Equals(word.Eng.ToLower().Trim()));
                                if (wordFromDb == null)
                                {
                                    words.Add(word);
                                    _repo.Create(word);
                                }
                            }
                            if (await _repo.SaveAll())
                            {
                                return Ok(words);
                            }
                            return NoContent();
                        }
                    }
                }
                return BadRequest(new
                {
                    error = "File not supported"
                });
            }
            return NoContent();
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
        [HttpPost("{wordId}/examples/add/{exampleId}")]
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
        [HttpPut("{wordId}/examples/{exampleId}")]
        public async Task<IActionResult> UpdateExample(int wordId, int exampleId, [FromBody] Example example)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            if (wordFromDb == null)
            {
                return NotFound(new
                {
                    NotFound = "Không tìm thấy từ"
                });
            }
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Eng", example.Eng);
            if (_repo.Exists<Example>(properties))
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
            if (await _repo.SaveAll())
            {
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