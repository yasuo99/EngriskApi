using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class TopupHistory
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public DateTime TopupDate { get; set; }
        public int Amount { get; set; }
    }
}