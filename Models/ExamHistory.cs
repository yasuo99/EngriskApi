using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class ExamHistory
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        [ForeignKey("ExamId")]
        public virtual Exam Exam { get; set; }
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public DateTime Start_At { get; set; }
        public DateTime End_At { get; set; }
        public bool IsDoing { get; set; }
        public int TotalTime { get; set; }
        public int Exp { get; set; }
        public int Score { get; set; }
    }
}