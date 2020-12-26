using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.DTOs.Comment;
using Engrisk.DTOs.Post;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var posts = await _repo.GetAll<Post>(subjectParams, null, "Account, Comments, PostRatings");
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
        public async Task<IActionResult> GetFollowingPosts([FromQuery] SubjectParams subjectParams)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var posts = await _repo.GetAll<Post>(subjectParams, post => post.PostRatings.Any(account => account.AccountId == userId), "Account");
            var returnPosts = _mapper.Map<IEnumerable<PostDTO>>(posts);
            return Ok(returnPosts);
        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchPosts([FromQuery] SubjectParams subjectParams, [FromBody] SearchDTO searchDTO)
        {
            var postsFromDb = await _repo.GetAll<Post>(subjectParams, post => post.Title.ToLower().Contains(searchDTO.Search.ToLower().Trim()) || post.Content.ToLower().Contains(searchDTO.Search.ToLower().Trim()), "Account");
            var returnPosts = _mapper.Map<IEnumerable<PostDTO>>(postsFromDb);
            return Ok(returnPosts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id, [FromQuery] SubjectParams subjectParams, [FromQuery] string orderBy = "newest")
        {
            var postQuery = await _repo.GetOneWithManyToMany<Post>(pos => pos.Id == id);
            var post = await postQuery.Include(p => p.Account).Include(p => p.Comments).ThenInclude(c => c.Account).FirstOrDefaultAsync();
            if (post == null)
            {
                return NotFound();
            }
            post.Comments = post.Comments.Where(c => c.IsReplyComment == false);
            foreach (var comment in post.Comments)
            {
                var temp = await _repo.GetOneWithManyToMany<CommentReply>(r => r.CommentId == comment.Id);
                comment.Replies = await temp.Include(r => r.Reply).ThenInclude(a => a.Account).ToListAsync();
            }
            var returnPost = _mapper.Map<PostDetailDTO>(post);
            switch (orderBy)
            {
                case "like":
                    returnPost.Comments = returnPost.Comments.Where(c => c.IsReplyComment == false).OrderByDescending(c => c.Like).ToList();
                    break;
                case "newest":
                    returnPost.Comments = returnPost.Comments.Where(c => c.IsReplyComment == false).OrderByDescending(c => c.Date).ToList();
                    break;
                case "oldest":
                    returnPost.Comments = returnPost.Comments.Where(c => c.IsReplyComment == false).OrderBy(c => c.Date).ToList();
                    break;
                default: break;
            }
            return Ok(returnPost);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] Post post)
        {
            var accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var accountFromDb = await _repo.GetOneWithCondition<Account>(acc => acc.Id == accountId);
            if (accountFromDb.Locked > DateTime.Now)
            {
                return BadRequest(new
                {
                    Error = "Tài khoản của bạn đang bị khóa chức năng thảo luận"
                });
            }
            post.AccountId = accountId;
            var properties = new Dictionary<dynamic, dynamic>();
            properties.Add("Content", post.Content);
            properties.Add("Title", post.Title);
            properties.Add("AccountId", accountId);
            if (_repo.Exists<Post>(properties))
            {
                return Conflict(new
                {
                    Error = "Bài viết bị trùng"
                });
            }
            post.Date = DateTime.Now;
            post.Title = await CensoredString(post.Title);
            post.Content = await CensoredString(post.Content);
            var lastCreatedPost = await _repo.GetOneWithCondition<Post>(p => p.AccountId == accountId && p.Date.AddMinutes(15) > DateTime.Now);
            if (lastCreatedPost != null)
            {
                return BadRequest(new
                {
                    Error = "Không được phép đăng liên tiếp bài viết"
                });
            }
            _repo.Create(post);
            if (await _repo.SaveAll())
            {
                return Ok();
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
            if (DateTime.Compare(accountFromDb.Locked, DateTime.Now) > 0)
            {
                return BadRequest(new
                {
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
        [Authorize]
        [HttpPost("{postId}/comments/{commentId}")]
        public async Task<IActionResult> ReplyComment(int postId, int commentId, [FromBody] CommentReplyDTO commentReplyDTO)
        {
            try
            {
                var postFromDb = await _repo.GetOneWithCondition<Post>(post => post.Id == postId, "Comments");
                if (postFromDb == null)
                {
                    return NotFound(new
                    {
                        Error = "Không tìm thấy bài viết"
                    });
                }
                if (!postFromDb.Comments.Any(c => c.Id == commentId))
                {
                    return NotFound(new
                    {
                        Error = "Không tìm thấy bình luận"
                    });
                }
                if (await ValidateString(commentReplyDTO.Content))
                {
                    return BadRequest(new
                    {
                        validate = "Comment có chứa quá nhiều kí tự nhạy cảm"
                    });
                }
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var accountFromDb = await _repo.GetOneWithCondition<Account>(acc => acc.Id == userId);
                if (accountFromDb.Locked > DateTime.Now)
                {
                    return BadRequest(new
                    {
                        Error = "Tài khoản của bạn đang bị khóa chức năng thảo luận"
                    });
                }
                var comment = new Comment()
                {
                    PostId = postId,
                    AccountId = userId,
                    Content = commentReplyDTO.Content,
                    Date = DateTime.Now,
                    Like = 0,
                    Dislike = 0,
                    IsReplyComment = true
                };
                _repo.Create(comment);
                await _repo.SaveAll();
                var replyComment = new CommentReply()
                {
                    CommentId = commentId,
                    ReplyId = comment.Id,
                    Date = DateTime.Now
                };
                _repo.Create(replyComment);
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
        [Authorize]
        [HttpPut("{postId}/comments/{commentId}")]
        public async Task<IActionResult> EditReplyComment(int postId, int commentId, [FromBody] CommentReplyDTO commentReplyDTO)
        {
            try
            {
                var postFromDb = await _repo.GetOneWithCondition<Post>(post => post.Id == postId, "Comments");
                if (postFromDb == null)
                {
                    return NotFound(new
                    {
                        Error = "Không tìm thấy bài viết"
                    });
                }
                if (!postFromDb.Comments.Any(c => c.Id == commentId))
                {
                    return NotFound(new
                    {
                        Error = "Không tìm thấy bình luận"
                    });
                }
                if (await ValidateString(commentReplyDTO.Content))
                {
                    return BadRequest(new
                    {
                        validate = "Comment có chứa quá nhiều kí tự nhạy cảm"
                    });
                }
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var accountFromDb = await _repo.GetOneWithCondition<Account>(acc => acc.Id == userId);
                if (accountFromDb.Locked > DateTime.Now)
                {
                    return BadRequest(new
                    {
                        Error = "Tài khoản của bạn đang bị khóa chức năng thảo luận"
                    });
                }
                var commentFromDb = await _repo.GetOneWithConditionTracking<Comment>(c => c.Id == commentId);
                if (userId != commentFromDb.AccountId && (!User.IsInRole("forumadmin") || !User.IsInRole("manager") || !User.IsInRole("superadmin")))
                {
                    return Unauthorized();
                }
                commentFromDb.Content = commentReplyDTO.Content;
                var replyCommentFromDb = await _repo.GetOneWithConditionTracking<CommentReply>(cr => cr.ReplyId == commentId);
                if (replyCommentFromDb != null)
                {
                    replyCommentFromDb.IsEdited = true;
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
        [Authorize]
        [HttpPut("{postId}/comments/{commentId}/like")]
        public async Task<IActionResult> LikeComment(int postId, int commentId)
        {
            var accountId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var postFromDb = await _repo.GetOneWithCondition<Post>(post => post.Id == postId);
            if (postFromDb == null)
            {
                return NotFound(new
                {
                    Error = "Không tìm thấy bài viết"
                });
            }
            var commentOfPost = await _repo.GetOneWithConditionTracking<Comment>(comment => comment.PostId == postId && comment.Id == commentId);
            if (commentOfPost == null)
            {
                return NotFound(new
                {
                    Error = "Không tìm thấy bình luận"
                });
            }
            if (commentOfPost.AccountId == accountId)
            {
                return NoContent();
            }
            var likedComment = await _repo.GetOneWithCondition<LikedComment>(c => c.CommentId == commentOfPost.Id && c.AccountId == accountId);
            if (likedComment == null)
            {
                var likeComment = new LikedComment()
                {
                    AccountId = accountId,
                    CommentId = commentOfPost.Id,
                    Like_at = DateTime.Now
                };
                commentOfPost.Like += 1;
                _repo.Create(likeComment);
                if (await _repo.SaveAll())
                {
                    return Ok();
                }
            }
            else
            {
                commentOfPost.Like -= 1;
                _repo.Delete(likedComment);
                if (await _repo.SaveAll())
                {
                    return Ok();
                }
            }
            return NoContent();
        }
        [Authorize]
        [HttpDelete("{id}/comments/{commentId}")]
        public async Task<IActionResult> DeleteComment(int id, int commentId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var postFromDb = await _repo.GetOneWithCondition<Post>(post => post.Id == id, "Comments");
            if (postFromDb == null)
            {
                return NotFound(new
                {
                    NotFound = "Không tìm thấy bài viết"
                });
            }
            var commentFromDb = await _repo.GetOneWithConditionTracking<Comment>(comment => comment.Id == commentId, "Replies,LikedComments");
            if (commentFromDb == null)
            {
                return NotFound(new
                {
                    NotFound = "Không tìm thấy bình luận"
                });
            }
            if (userId != commentFromDb.AccountId && !User.IsInRole("forumadmin") && !User.IsInRole("manager") && !User.IsInRole("superadmin"))
            {
                return Unauthorized();
            }
            if (commentFromDb.Replies.Count() > 0)
            {
                foreach (var reply in commentFromDb.Replies)
                {
                    var comment = await _repo.GetOneWithCondition<Comment>(c => c.Id == reply.ReplyId, "LikedComments");
                    foreach (var like in comment.LikedComments)
                    {
                        _repo.Delete(like);
                    }
                    _repo.Delete(comment);
                    _repo.Delete(reply);
                }
            }
            if (commentFromDb.LikedComments.Count() > 0)
            {
                foreach (var like in commentFromDb.LikedComments)
                {
                    _repo.Delete(like);
                }
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
            if (id != rating.Id)
            {
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
        public async Task<IActionResult> UpdatePost(int id, [FromBody] PostUpdateDTO post)
        {
            try
            {
                var postFromDb = await _repo.GetOneWithConditionTracking<Post>(post => post.Id == id);
                if (postFromDb == null)
                {
                    return NotFound();
                }
                _mapper.Map(post, postFromDb);
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
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            try
            {
                var postFromDb = await _repo.GetOneWithCondition<Post>(post => post.Id == id, "Comments, LikedPosts, PostRatings");
                if (postFromDb == null)
                {
                    return NotFound();
                }
                foreach (var comment in postFromDb.Comments.Where(c => c.IsReplyComment == false))
                {
                    await DeleteComment(id, comment.Id);
                    // var repliesOfComment = await _repo.GetAll<CommentReply>(r => r.CommentId == comment.Id);
                    // foreach (var reply in repliesOfComment)
                    // {
                    //     _repo.Delete(reply);
                    //     await _repo.SaveAll();
                    // }
                    // var likesComment = await _repo.GetAll<LikedComment>(c => c.CommentId == comment.Id);
                    // _repo.Delete(comment);
                    // await _repo.SaveAll();
                }
                foreach (var likePost in postFromDb.LikedPosts)
                {
                    _repo.Delete(likePost);
                }
                foreach (var postRating in postFromDb.PostRatings)
                {
                    _repo.Delete(postRating);
                }
                var transactionPost = await _repo.GetOneWithCondition<Post>(p => p.Id == id);
                _repo.Delete(transactionPost);
                if (await _repo.SaveAll())
                {
                    return Ok();
                }
                return StatusCode(500);
            }
            catch (System.Exception e)
            {

                throw e;
            }

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