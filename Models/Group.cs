using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Group
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        public string GroupName { get; set; }
        public virtual IEnumerable<Word> Words { get; set; }
    }
}