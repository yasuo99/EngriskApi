using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public int Like { get; set; }
        public int Dislike { get; set; }
        public virtual IEnumerable<CommentReply> Replies { get; set; }
        public virtual IEnumerable<CommentReply> Comments { get; set; }
        public virtual IEnumerable<LikedComment> LikedComments { get; set; }
    }
}