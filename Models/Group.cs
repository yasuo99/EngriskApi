using System;
using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Group
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        public string GroupName { get; set; }
        public DateTime Created_At { get; set; }
        public virtual IEnumerable<WordGroup> Words { get; set; }
    }
}