using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Engrisk.Models;

namespace Engrisk.DTOs
{
    public class PostDTO
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string AccountUserName { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int UpVote { get; set; }
        public int DownVote { get; set; }
        public DateTime Date { get; set; }
        public virtual IEnumerable<AccountCommentDTO> Comments { get; set; }
        public virtual IEnumerable<UpvoteDTO> PostUpvotes { get; set; }
    }
}