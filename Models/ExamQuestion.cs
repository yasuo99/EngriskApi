using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class ExamQuestion
    {
        public int ExamId { get; set; }
        [ForeignKey("ExamId ")]
        public virtual Exam Exam { get; set; }
        public int QuestionId { get; set; }
        [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; }
    }
}