using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/v1/[Controller]")]
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
        public async Task<IActionResult> GetAll([FromQuery] SubjectParams subjectParams)
        {
            var groupsFromDb = await _repo.GetAll<Group>(subjectParams, includeProperties: "Account");
            var returnGroups = _mapper.Map<IEnumerable<GroupDTO>>(groupsFromDb);
            return Ok(returnGroups);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupDetail(int id)
        {
            var queryGroup = await _repo.GetOneWithManyToMany<Group>(group => group.Id == id);
            if (queryGroup == null)
            {
                return NotFound();
            }
            var groupFromDb = await queryGroup.Include(g => g.Account).Include(w => w.Words).ThenInclude(w => w.Word).FirstOrDefaultAsync();
            var returnGroup = _mapper.Map<GroupDTO>(groupFromDb);
            return Ok(returnGroup);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody] Group group)
        {
            int accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("GroupName", group.GroupName);
            properties.Add("AccountId", accountId);
            if (_repo.Exists<Group>(properties))
            {
                return Conflict();
            }
            group.Created_At = DateTime.Now;
            group.AccountId = accountId;
            _repo.Create(group);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(int id, [FromBody] string groupName)
        {
            int accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var groupFromDb = await _repo.GetOneWithCondition<Group>(group => group.Id == id);
            if (groupFromDb == null)
            {
                return NotFound();
            }
            if (groupFromDb.AccountId != accountId)
            {
                return Unauthorized();
            }
            groupFromDb.GroupName = groupName;
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            int accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var groupFromDb = await _repo.GetOneWithCondition<Group>(group => group.Id == id);
            if (groupFromDb == null)
            {
                return NotFound(new
                {
                    Error = "Không tìm thấy group"
                });
            }
            if (groupFromDb.AccountId != accountId)
            {
                return Unauthorized();
            }
            _repo.Delete(groupFromDb);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return NoContent();
        }
        [HttpGet("accounts/{accountId}")]
        public async Task<IActionResult> GetGroupsOfAccount([FromQuery] SubjectParams subjectParams, int accountId)
        {
            if (User.FindFirst(ClaimTypes.NameIdentifier) != null)
            {
                int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                if (id != accountId)
                {
                    return Unauthorized();
                }
            }
            var groupsOfAcc = await _repo.GetOneWithManyToMany<Group>(g => g.AccountId == accountId);
            var groups = await groupsOfAcc.Include(a => a.Account).Include(g => g.Words).ThenInclude(g => g.Word).ThenInclude(w => w.Examples).ThenInclude(e => e.Example).ToListAsync();
            var returnGroups = _mapper.Map<IEnumerable<GroupDTO>>(groups);
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
        [HttpPut("{groupId}/words/{wordId}")]
        public async Task<IActionResult> AddWordToGroup(int groupId, int wordId)
        {
            try
            {
                var wordFromDb = await _repo.GetOneWithCondition<Word>(w => w.Id == wordId);
                if (wordFromDb == null)
                {
                    return NotFound();
                }
                var wordInGroup = await _repo.GetOneWithCondition<WordGroup>(w => w.WordId == wordId && w.GroupId == groupId);
                if (wordInGroup != null)
                {
                    _repo.Delete(wordInGroup);
                    if (await _repo.SaveAll())
                    {
                        return Ok();
                    }
                    return NoContent();
                }
                else
                {
                    var wordGroup = new WordGroup()
                    {
                        WordId = wordId,
                        GroupId = groupId
                    };
                    _repo.Create(wordGroup);
                    if (await _repo.SaveAll())
                    {
                        return Ok();
                    }
                    return NoContent();
                }
            }
            catch (System.Exception e)
            {

                throw e;
            }
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