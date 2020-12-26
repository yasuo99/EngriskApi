using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Engrisk.DTOs
{
    public class QuizDTO
    {
        public int Id { get; set; }
        public string QuizName { get; set; }
        public int DifficultLevel { get; set; }
        public int ExpGain { get; set; }
        public int DurationTime { get; set; }
        public virtual IEnumerable<QuestionDTO> Questions { get; set; }
    }
}