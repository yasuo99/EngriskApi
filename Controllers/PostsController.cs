using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/v1/[Controller]")]
    public class PostsController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly IMapper _mapper;
        public PostsController(ICRUDRepo repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPosts([FromQuery] SubjectParams subjectParams)
        {
            var posts = await _repo.GetAll<Post>(subjectParams, null, "Account");
            var returnPosts = _mapper.Map<IEnumerable<PostDTO>>(posts);
            return Ok(returnPosts);
        }
        [HttpGet("rating")]
        public async Task<IActionResult> GetHighRatePosts([FromQuery] SubjectParams subjectParams)
        {
            var posts = await _repo.GetAll<Post>(subjectParams, null, "Account", order => order.OrderByDescending(post => post.Rating));
            var returnPosts = _mapper.Map<IEnumerable<PostDTO>>(posts);
            return Ok(returnPosts);
        }
        [HttpGet("new")]
        public async Task<IActionResult> GetNewPosts([FromQuery] SubjectParams subjectParams)
        {
            var posts = await _repo.GetAll<Post>(subjectParams, null, "Account", order => order.OrderByDescending(post => post.Date));
            var returnPosts = _mapper.Map<IEnumerable<PostDTO>>(posts);
            return Ok(returnPosts);
        }
        [Authorize]
        [HttpGet("following")]
        public async Task<IActionResult> GetFollowingPosts([FromQuery] SubjectParams subjectParams){
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var posts = await _repo.GetAll<Post>(subjectParams, post => post.PostRatings.Any(account => account.AccountId == userId), "Account");
            var returnPosts = _mapper.Map<IEnumerable<PostDTO>>(posts);
            return Ok(returnPosts);
        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchPosts([FromQuery] SubjectParams subjectParams, [FromBody] SearchDTO searchDTO){
            var postsFromDb = await _repo.GetAll<Post>(subjectParams, post => post.Title.ToLower().Contains(searchDTO.Search.ToLower().Trim()) || post.Content.ToLower().Contains(searchDTO.Search.ToLower().Trim()),"Account");
            var returnPosts = _mapper.Map<IEnumerable<PostDTO>>(postsFromDb);
            return Ok(returnPosts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _repo.GetOneWithConditionTracking<Post>(pos => pos.Id == id, "Account,PostRatings");
            if (post == null)
            {
                return NotFound();
            }
            var returnPost = _mapper.Map<PostDTO>(post);
            return Ok(returnPost);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePost(Post post)
        {
            if (ModelState.IsValid)
            {
                return StatusCode(400, new
                {
                    errors = ModelState.Select(error => error.Value.Errors).Where(error => error.Count > 0).ToList()
                });
            }
            var accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            post.AccountId = accountId;
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Content", post.Content);
            properties.Add("Title", post.Title);
            properties.Add("AccountId", accountId);
            if (_repo.Exists<Post>(properties))
            {
                return Conflict();
            }
            _repo.Create(post);
            if (await _repo.SaveAll())
            {
                return CreatedAtAction("GetPost", new { id = post.Id }, post);
            }
            else
            {
                return StatusCode(500);
            }
        }
        [Authorize]
        [HttpPost("{id}/comments")]
        public async Task<IActionResult> CommentToPost(int id, [FromBody] CommentDTO comment)
        {
            if (await ValidateString(comment.Comment))
            {
                return BadRequest(new
                {
                    validate = "Comment có chứa quá nhiều kí tự nhạy cảm"
                });
            }
            comment.Comment = await CensoredString(comment.Comment);
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var accountFromDb = await _repo.GetOneWithCondition<Account>(acc => acc.Id == userId);
            if(DateTime.Compare(accountFromDb.Locked,DateTime.Now) > 0)
            {
                return BadRequest(new {
                    error = "Tài khoản tạm thời bị khóa bình luận"
                });
            }
            var postFromDb = await _repo.GetOneWithCondition<Post>(post => post.Id == id);
            if (postFromDb == null)
            {
                return NotFound();
            }
            var commentToPost = new Comment()
            {
                PostId = id,
                AccountId = userId,
                Content = comment.Comment,
                Date = DateTime.Now,
                Like = 0,
                Dislike = 0
            };
            _repo.Create(commentToPost);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPut("{postId}/comments/{commentsId}/like")]
        public async Task<IActionResult> LikeComment(int postId, int commentId){
            var accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var postFromDb = await _repo.GetOneWithCondition<Post>(post => post.Id == postId);
            return Ok();
        }
        [HttpDelete("{id}/comments/{commentId}")]
        public async Task<IActionResult> DeleteComment(int id, int commentId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var postFromDb = await _repo.GetOneWithCondition<Post>(post => post.Id == id);
            if (postFromDb == null)
            {
                return NotFound(new
                {
                    NotFound = "Không tìm thấy bài viết"
                });
            }
            var commentFromDb = await _repo.GetOneWithCondition<Comment>(comment => comment.Id == id && comment.AccountId == userId);
            if (commentFromDb == null)
            {
                return NotFound(new
                {
                    NotFound = "Không tìm thấy bình luận"
                });
            }
            _repo.Delete(commentFromDb);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [Authorize]
        [HttpPost("{id}/rating")]
        public async Task<IActionResult> UpDownVotePost(int id, [FromBody] RatingDTO rating)
        {
            if(id != rating.Id){
                return NotFound();
            }
            var accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var post = await _repo.GetOneWithCondition<Post>(post => post.Id == id);
            var postRatingFromDb = await _repo.GetOneWithCondition<PostRating>(post => post.AccountId == accountId && post.PostId == id);
            if (postRatingFromDb == null)
            {
                var postUpvote = new PostRating()
                {
                    PostId = id,
                    AccountId = accountId,
                    Rating = rating.Rating,
                    Date = DateTime.Now
                };
                _repo.Create(postUpvote);
            }
            else
            {
                postRatingFromDb.Rating = rating.Rating;
                postRatingFromDb.Date = DateTime.Now;
            }
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, Post post)
        {
            var postFromDb = await _repo.GetOneWithCondition<Post>(post => post.Id == id);
            if (postFromDb == null)
            {
                return NotFound();
            }
            _repo.Update(post);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPut("{id}/lock")]
        public async Task<IActionResult> LockPost(int id)
        {
            int accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var postFromDb = await _repo.GetOneWithConditionTracking<Post>(post => post.Id == id);
            if (postFromDb == null)
            {
                return NotFound();
            }
            if (User.IsInRole("superadmin") || User.IsInRole("forumadmin"))
            {
                postFromDb.IsLocked = postFromDb.IsLocked ? false : true;
            }
            else
            {
                if (postFromDb.AccountId != accountId)
                {
                    return Unauthorized();
                }
                postFromDb.IsLocked = postFromDb.IsLocked ? false : true;
            }
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var postFromDb = await _repo.GetOneWithConditionTracking<Post>(post => post.Id == id);
            if (postFromDb == null)
            {
                return NotFound();
            }
            _repo.Delete(postFromDb);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return StatusCode(500);
        }
        [HttpDelete]
        public async Task<IActionResult> DeletePosts()
        {
            var posts = await _repo.GetAll<Post>(null, "");
            _repo.Delete(posts);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return StatusCode(500);
        }
        private async Task<bool> ValidateString(string input)
        {
            var stringFilter = await _repo.GetAll<StringFilter>(null, "");
            int sensitiveWord = 0;
            if (stringFilter.Count() == 0)
            {
                return false;
            }
            var lowerInput = input.ToLower();
            foreach (var filter in stringFilter.OrderByDescending(f => f.Word.Length))
            {
                if (stringFilter.Any(f => f.Word.Equals(filter.Word) == false && f.Word.Contains(filter.Word)))
                {
                    continue;
                }
                else
                {
                    if (lowerInput.Contains(filter.Word.ToLower()))
                    {
                        sensitiveWord++;
                    }
                }
            }
            if (sensitiveWord >= Math.Round((double)stringFilter.Count() / 4))
            {
                return true;
            }
            return false;
        }
        private async Task<string> CensoredString(string input)
        {
            var stringFilter = await _repo.GetAll<StringFilter>(null, "");
            foreach (var filter in stringFilter.OrderByDescending(f => f.Word.Length))
            {
                var temp = "";
                foreach (char filterChar in filter.Word)
                {
                    if (!Char.IsWhiteSpace(filterChar))
                    {
                        temp += "*";
                    }
                    else
                    {
                        temp += " ";
                    }
                }
                input = input.Replace(filter.Word, temp);
            }
            return input;
        }
    }
}