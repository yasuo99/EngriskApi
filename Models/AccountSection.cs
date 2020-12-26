using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class AccountSection
    {
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public int SectionId { get; set; }
        [ForeignKey("SectionId")]
        public virtual Section Section { get; set; }
        public int QuizDoneCount { get; set; }
        public DateTime Start_At { get; set; }
        public DateTime Done_At { get; set; }
    }
}