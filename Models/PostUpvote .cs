using System;

namespace Engrisk.Models
{
    public class PostUpvote 
    {
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        public DateTime Date { get; set; }
    }
}