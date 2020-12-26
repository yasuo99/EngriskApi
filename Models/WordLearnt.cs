using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class WordLearnt
    {
        public int WordId { get; set; }
        [ForeignKey("WordId")]
        public virtual Word Word { get; set; }
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public DateTime LastPractice { get; set; }
    }
}