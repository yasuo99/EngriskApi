using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Engrisk.DTOs.Comment;

namespace Engrisk.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string AccountPhotoUrl { get; set; }
        public string AccountUsername { get; set; }
        public bool IsVerified { get; set; }
        [Required]
        public string Comment { get; set; }
        public DateTime Date { get; set; }
        public int Like { get; set; }
        public int Dislike { get; set; }
        public bool IsReplyComment { get; set; }
        public virtual IEnumerable<ReplyDTO> Replies { get; set; }
    }
}