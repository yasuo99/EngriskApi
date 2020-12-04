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
    public class LevelsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        public LevelsController(ICRUDRepo repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SubjectParams subjectParams)
        {
            var levels = await _repo.GetAll<Level>(subjectParams);
            Response.AddPaginationHeader(levels.CurrentPage, levels.PageSize, levels.TotalItems, levels.TotalPages);
            return Ok(levels);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var levelFromDb = await _repo.GetOneWithCondition<Level>(level => level.Id == id);
            if (levelFromDb == null)
            {
                return NotFound();
            }
            return Ok(levelFromDb);
        }
        [HttpPost]
        public async Task<IActionResult> CreateLevel([FromBody] Level level)
        {
            var property = new Dictionary<dynamic, dynamic>();
            property.Add("LevelName", level.LevelName);
            if (_repo.Exists<Level>(property))
            {
                return Conflict();
            }
            else
            {
                property.Remove("LevelName");
                property.Add("StartExp", level.StartExp);
                property.Add("EndExp", level.EndExp);
                if (_repo.Exists<Level>(property))
                {
                    return Conflict();
                }
            }
            _repo.Create(level);
            if (await _repo.SaveAll())
            {
                return CreatedAtAction("GetDetail", new { id = level.Id }, level);
            }
            return BadRequest("Error on creating");
        }
        [HttpPut("{levelId}")]
        public async Task<IActionResult> UpdateLevel(int levelId, [FromBody] Level updateLevel)
        {
            try
            {
                var levelFromDb = await _repo.GetOneWithCondition<Level>(level => level.Id == levelId);
                if (levelFromDb == null)
                {
                    return NotFound();
                }
                var property = new Dictionary<dynamic, dynamic>();
                property.Add("LevelName", updateLevel.LevelName);
                if (_repo.Exists<Level>(property))
                {
                    return Conflict();
                }
                _repo.Update(updateLevel);
                if (await _repo.SaveAll())
                {
                    return Ok();
                }
                return BadRequest("Error on updating");
            }
            catch (System.Exception e)
            {
                throw e;
            }

        }
        [HttpDelete("{levelId}")]
        public async Task<IActionResult> DeleteLevel(int levelId)
        {
            var levelFromDb = await _repo.GetOneWithCondition<Level>(lv => lv.Id == levelId);
            if (levelFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(levelFromDb);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Error on deleting");
        }
    }
}