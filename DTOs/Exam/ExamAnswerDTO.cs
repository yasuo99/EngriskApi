using System.Collections.Generic;
using Engrisk.DTOs.Question;

namespace Engrisk.DTOs.Exam
{
    public class ExamAnswerDTO
    {
         public int Id { get; set; }
        public string Title { get; set; }
        public int ExpGain { get; set; }
        public int Price { get; set; }
        public int Duration { get; set; }
        public virtual IEnumerable<QuestionAnswerDTO> Questions { get; set; }
    }
}