using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Example
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public virtual IEnumerable<WordExample> Words { get; set; }
    }
}