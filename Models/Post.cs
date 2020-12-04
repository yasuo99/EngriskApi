using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    //Model post: bài viết của người dùng đăng trên diễn đàn, có upvote và downvote để sử dụng thuật toán làm mới bài viết
    public class Post
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        public bool IsLocked { get; set; }
        public virtual IEnumerable<Comment> Comments { get; set; }
        public virtual IEnumerable<PostRating> PostRatings { get; set; }
        public virtual IEnumerable<LikedPost> LikedPosts { get; set; }
    }
}