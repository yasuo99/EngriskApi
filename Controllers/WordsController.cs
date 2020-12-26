using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs.Word;
using Engrisk.Helper;
using Engrisk.Models;
using Engrisk.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly IUploadService _dropbox;
        public WordsController(ICRUDRepo repo, IMapper mapper, IOptions<CloudinarySettings> cloudinarySettings, IUploadService dropbox)
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
            _dropbox = dropbox;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllWord([FromQuery] SubjectParams subjectParams)
        {
            var wordsQueryable = await _repo.GetOneWithManyToMany<Word>();
            var words = await wordsQueryable.Include(w => w.Examples).ThenInclude(w => w.Example).ToListAsync();
            var returnWords = _mapper.Map<IEnumerable<WordDTO>>(words);
            return Ok(returnWords);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWord(int id)
        {
            var wordsQueryable = await _repo.GetOneWithManyToMany<Word>(w => w.Id == id);
            var word = await wordsQueryable.Include(w => w.Examples).ThenInclude(w => w.Example).FirstOrDefaultAsync();
            if (word == null)
            {
                return NotFound();
            }
            var returnWord = _mapper.Map<WordDetailDTO>(word);
            return Ok(returnWord);
        }
        [HttpGet("search/{word}")]
        public async Task<IActionResult> SearchWord([FromQuery] SubjectParams subjectParams, string word)
        {
            var words = await _repo.GetAll<Word>(subjectParams, w => w.Eng.Contains(word) || w.Vie.Contains(word));
            return Ok(words);
        }
        [HttpGet("detail")]
        public async Task<IActionResult> GetWord([FromQuery] string search)
        {
            var wordsQueryable = await _repo.GetOneWithManyToMany<Word>(w => w.Eng.ToLower().Equals(search.ToLower()) || w.Vie.ToLower().Equals(search.ToLower()));
            var word = await wordsQueryable.Include(w => w.Examples).ThenInclude(w => w.Example).FirstOrDefaultAsync();
            if (word == null)
            {
                return NotFound();
            }
            var returnWord = _mapper.Map<WordDetailDTO>(word);
            if (returnWord.Eng.ToLower().Equals(search.ToLower()))
            {
                return Ok(new
                {
                    direction = "en",
                    word = returnWord
                });
            }
            else
            {
                return Ok(new
                {
                    direction = "vi",
                    word = returnWord
                });
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateWord([FromForm] WordCreateDTO wordDTO)
        {
            var properties = new Dictionary<dynamic, dynamic>();
            if (string.IsNullOrEmpty(wordDTO.Eng))
            {
                return BadRequest(new
                {
                    Error = "Không được để trống fields"
                });
            }
            properties.Add("Eng", wordDTO.Eng.ToLower());
            if (_repo.Exists<Word>(properties))
            {
                return Conflict(new
                {
                    Error = "Từ vựng bị trùng"
                });
            }
            var word = _mapper.Map<Word>(wordDTO);
            if (wordDTO.File != null)
            {
                var result = _cloud.UploadImage(wordDTO.File);
                if (result != null)
                {
                    word.WordImg = result.PublicUrl;
                    word.PublicId = result.PublicId;
                }
            }
            if (wordDTO.Audio != null)
            {
                var uploadResult = await _dropbox.UploadFile(wordDTO.Audio, "/Engrisk");
                if (uploadResult != null)
                {
                    word.WordVoice = uploadResult.SharedUrl;
                }
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
                                Spelling = (string)jToken["spelling"],
                                WordVoice = (string)jToken["wordVoice"]
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
        public async Task<IActionResult> ImportExcel([FromQuery] string sheet, [FromForm] IFormFile file)
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
                        var temp = result.Tables[sheet];
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
        public async Task<IActionResult> UpdateWord(int wordId, [FromForm] WordCreateDTO word)
        {
            try
            {
                var wordFromDb = await _repo.GetOneWithConditionTracking<Word>(word => word.Id == wordId);
                if (wordFromDb == null)
                {
                    return NotFound();
                }
                _mapper.Map(word, wordFromDb);
                if (word.File != null)
                {
                    if (!string.IsNullOrEmpty(wordFromDb.PublicId))
                    {
                        var deleteResult = _cloud.DeleteImage(wordFromDb.PublicId);
                        if (deleteResult)
                        {
                            var uploadResult = _cloud.UploadImage(word.File);
                            if (uploadResult != null)
                            {
                                wordFromDb.WordImg = uploadResult.PublicUrl;
                                wordFromDb.PublicId = uploadResult.PublicId;
                            }
                        }
                    }
                }
                if (word.Audio != null)
                {
                    var audioUploadResult = await _dropbox.UploadFile(word.Audio, "/Engrisk");
                    if (audioUploadResult != null)
                    {
                        wordFromDb.WordVoice = audioUploadResult.SharedUrl;
                    }
                }
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
        [HttpPost("{wordId}/examples")]
        public async Task<IActionResult> AddWordExample(int wordId, [FromBody] Example example)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            var exampleFromDb = await _repo.GetOneWithCondition<Example>(example => example.Eng.TrimStart().TrimEnd().Equals(example.Eng.TrimStart().TrimEnd()) || example.Vie.TrimStart().TrimEnd().Equals(example.Vie.TrimStart().TrimEnd()));
            if (wordFromDb == null)
            {
                return NotFound();
            }
            if (exampleFromDb == null)
            {
                var newExample = new Example()
                {
                    Eng = example.Eng,
                    Vie = example.Vie,
                    Inserted = DateTime.Now
                };
                _repo.Create(newExample);
                var wordExample = new WordExample()
                {
                    WordId = wordId,
                    ExampleId = newExample.Id
                };
                _repo.Create(wordExample);
            }
            else
            {
                var wordExample = new WordExample()
                {
                    WordId = wordId,
                    ExampleId = exampleFromDb.Id
                };
                _repo.Create(wordExample);
            }

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
        [HttpDelete("{wordId}/examples/{exampleId}")]
        public async Task<IActionResult> DeleteExample(int wordId, int exampleId)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(word => word.Id == wordId);
            if (wordFromDb == null)
            {
                return NotFound();
            }
            var exampleFromDb = await _repo.GetOneWithCondition<Example>(e => e.Id == exampleId);
            if (exampleFromDb == null)
            {
                return NotFound(new
                {
                    NotFound = "Không tìm thấy ví dụ"
                });
            }
            _repo.Delete(exampleFromDb);
            if (await _repo.SaveAll())
            {
                return NoContent();
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
            return BadRequest(new { Error = "Error on deleting word"});
        }
    }
}