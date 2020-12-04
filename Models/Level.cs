using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class Level
    {
        public int Id { get; set; }
        public string LevelName { get; set; }
        public int StartExp { get; set; }
        public int EndExp { get; set; }
        public DateTime Inserted { get; set; }
        public virtual IEnumerable<Account> Accounts { get; set; }
    }
}