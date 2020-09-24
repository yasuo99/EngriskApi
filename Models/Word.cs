using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Word
    {
        public int Id { get; set; }
        public string WordCategory { get; set; }
        public string WordImg { get; set; }
        public string Eng  { get; set; }
        public string Vni { get; set; }
        public virtual IEnumerable<WordExample> Examples{get;set;}
    }
}