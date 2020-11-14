using System;
using System.Collections.Generic;
using System.Security.Claims;
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
    [Route("v1/[Controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        public GroupsController(ICRUDRepo Repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = Repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]SubjectParams subjectParams)
        {
            var groupsFromDb = await _repo.GetAll<Group>(subjectParams);
            var returnGroups = _mapper.Map<GroupDTO>(groupsFromDb);
            return Ok(returnGroups);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupDetail(int id)
        {
            var groupFromDb = await _repo.GetOneWithCondition<Group>(group => group.Id == id, "Account,Words");
            if (groupFromDb == null)
            {
                return NotFound();
            }
            var returnGroup = _mapper.Map<GroupDTO>(groupFromDb);
            return Ok(returnGroup);
        }
        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody] Group group)
        {
            int accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("GroupName", group.GroupName);
            if (_repo.Exists<Group>(properties))
            {
                return Conflict();
            }
            group.Created_At = DateTime.Now;
            _repo.Create(group);
            if(await _repo.SaveAll()){
                var returnGroup = _mapper.Map<GroupDTO>(group);
                return CreatedAtAction("GetGroupDetail", new {id = group.Id}, returnGroup);
            }
            return StatusCode(500);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(int id, [FromBody] string groupName){
            int accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var groupFromDb = await _repo.GetOneWithCondition<Group>(group => group.Id == id);
            if(groupFromDb == null)
            {
                return NotFound();
            }
            if(groupFromDb.AccountId != accountId){
                return Unauthorized();
            }
            groupFromDb.GroupName = groupName;
            if(await _repo.SaveAll()){
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            int accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var groupFromDb = await _repo.GetOneWithCondition<Group>(group => group.Id == id);
            if(groupFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(groupFromDb);
            return Ok();
        }
        [HttpGet("accounts/{accountId}")]
        public async Task<IActionResult> GetGroupsOfAccount(int accountId)
        {
            int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (id != accountId)
            {
                return Unauthorized();
            }
            var groupsOfAcc = await _repo.GetAll<Group>(null, g => g.AccountId == accountId, "Words");
            var returnGroups = _mapper.Map<GroupDTO>(groupsOfAcc);
            if (groupsOfAcc == null)
            {
                return NotFound();
            }
            return Ok(returnGroups);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(int id, Group group)
        {
            var groupFromdb = await _repo.GetAll<Group>(group => group.Id == id);
            if (groupFromdb == null)
            {
                return NotFound();
            }
            _mapper.Map(group, groupFromdb);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPost("{id}/words")]
        public async Task<IActionResult> AddWordToGroup(int groupId, Word word)
        {
            var wordFromDb = await _repo.GetOneWithCondition<Word>(w => w.Id == word.Id);
            if (wordFromDb == null)
            {
                return NotFound();
            }
            var wordGroup = new WordGroup()
            {
                WordId = word.Id,
                GroupId = groupId
            };
            _repo.Create(wordGroup);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpDelete("{groupId}/words/{wordId}")]
        public async Task<IActionResult> RemoveWordFromGroup(int groupId, int wordId)
        {
            var groupFromDb = await _repo.GetOneWithCondition<Group>(g => g.Id == groupId);
            int accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (groupFromDb == null)
            {
                return NotFound();
            }
            if (groupFromDb.AccountId != accountId)
            {
                return Unauthorized();
            }
            var wordFromDb = await _repo.GetOneWithCondition<Word>(w => w.Id == wordId);
            if (wordFromDb == null)
            {
                return NotFound();
            }
            var wordInGroup = await _repo.GetOneWithCondition<WordGroup>(word => word.GroupId == groupId && word.WordId == wordId);
            if (wordInGroup == null)
            {
                return NotFound();
            }
            _repo.Delete(wordInGroup);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
    }
}