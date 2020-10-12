using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public string QuizName { get; set; }
        public int DifficultLevel { get; set; }
        public int ExpGain { get; set; }
        public int Enrolled { get; set; }
        public int Liked { get; set; }
        public int Dislike { get; set; }
        public int TotalScore { get; set; }
        public int PassScore { get; set; }
        public int DurationTime { get; set; }
        public virtual IEnumerable<QuizQuestion> Questions { get; set; }

    }
}