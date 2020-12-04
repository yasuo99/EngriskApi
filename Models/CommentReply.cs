using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class CommentReply
    {
        public int Id { get; set; }
        public int CommentId { get; set; }
        [ForeignKey("CommentId")]
        public virtual Comment Comment { get; set; }
        public int ReplyId { get; set; }
        [ForeignKey("ReplyId")]
        public virtual Comment Reply { get; set; }
        public DateTime Date { get; set; }
        public bool IsEdited { get; set; }
    }
}