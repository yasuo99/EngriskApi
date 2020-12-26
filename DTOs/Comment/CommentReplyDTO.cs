using System.ComponentModel.DataAnnotations;

namespace Engrisk.DTOs.Comment
{
    public class CommentReplyDTO
    {
        [Required]
        public string Content { get; set; }
    }
}