using System;
using System.Collections.Generic;
using Engrisk.Models;

namespace Engrisk.DTOs
{
    public class AdminAccountDTO
    {
         public string Fullname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public int Exp { get; set; }
        public int Point { get; set; }
        public DateTime Locked { get; set; }
        public bool IsDisabled { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public virtual IEnumerable<AccountRole> Roles { get; set; }
        public virtual IEnumerable<Comment> Comments { get; set; }
        public virtual IEnumerable<PostUpvote> PostUpvotes { get; set; }


    }
}