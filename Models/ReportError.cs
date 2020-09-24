using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class ReportError
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public int QuestionId { get; set; }
        [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; }
        public string Error { get; set; }
        public DateTime ReportDate { get; set; }
    }
}