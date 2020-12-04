using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class AccountBadge
    {
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public int BadgeId { get; set; }
        [ForeignKey("BadgeId")]
        public virtual Badge Badge { get; set; }
        public DateTime Date { get; set; }
    }
}