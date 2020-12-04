using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class Example
    {
        public int Id { get; set; }
        public string Eng { get; set; }
        public string Vie { get; set; }
        public DateTime Inserted { get; set; }
        public virtual IEnumerable<WordExample> Words { get; set; }
    }
}