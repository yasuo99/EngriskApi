using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Example
    {
        public int Id { get; set; }
        public string Eng { get; set; }
        public string Vie { get; set; }
        public virtual IEnumerable<WordExample> Words { get; set; }
    }
}