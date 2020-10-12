using System.Collections.Generic;
using Engrisk.Models;

namespace Engrisk.DTOs
{
    public class ExamDTO
    {
        public int Id { get; set; }
        public string QuizName { get; set; }
        public int ExpGain { get; set; }
        public virtual IEnumerable<QuestionDTO> Questions { get; set; }
    }
}