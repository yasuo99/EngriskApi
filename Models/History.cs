using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class History
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public int QuizId { get; set; }
        [ForeignKey("QuizzId")]
        public virtual Quiz Quiz { get; set; }
        public int Time { get; set; }
        public int Score { get; set; }
    }
}