using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class QuizQuestion
    {
        public int QuizId { get; set; }
        [ForeignKey("QuizId")]
        public virtual Quiz Quiz { get; set; }
        public int QuestionId { get; set; }
        [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; }
    }
}