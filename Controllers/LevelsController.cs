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
        public async Task<IActionResult> GetAll(SubjectParams subjectParams)
        {
            var levels = await _repo.GetAll<Level>(subjectParams);
            Response.AddPaginationHeader(levels.CurrentPage, levels.PageSize, levels.TotalItems, levels.TotalPages);
            return Ok(levels);
        }
        [HttpPost]
        public async Task<IActionResult> CreateLevel(Level level)
        {
            var property = new Dictionary<dynamic, dynamic>();
            property.Add("LevelName", level.LevelName);
            if (_repo.Exists<Level>(property))
            {
                return StatusCode(409);
            }
            _repo.Create(level);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Error on creating");
        }
        [HttpPut("{levelId}")]
        public async Task<IActionResult> UpdateLevel(int levelId, Level updateLevel)
        {
            var levelFromDb = await _repo.GetOneWithCondition<Level>(level => level.Id == levelId);
            if (levelFromDb == null)
            {
                return NotFound();
            }
            var property = new Dictionary<dynamic, dynamic>();
            property.Add("LevelName", updateLevel.LevelName);
            if(_repo.Exists<Level>(property))
            {
                return StatusCode(409);
            }
            _repo.Update(updateLevel);
            if(await _repo.SaveAll()){
                return Ok();
            }
            return BadRequest("Error on updating");
        }
        [HttpDelete("{levelId}")]
        public async Task<IActionResult> DeleteLevel(int levelId)
        {
            var levelFromDb = await _repo.GetOneWithCondition<Level>(lv => lv.Id == levelId);
            if(levelFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(levelFromDb);
            if(await _repo.SaveAll()){
                return Ok();
            }
            return BadRequest("Error on deleting");
        }
    }
}