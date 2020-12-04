using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class Badge
    {
        public int Id { get; set; }
        public string BadgeName { get; set; }
        public virtual IEnumerable<AccountBadge> Accounts { get; set; }
    }
}