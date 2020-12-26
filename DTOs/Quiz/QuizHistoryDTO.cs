using System;

namespace Engrisk.DTOs.Quiz
{
    public class QuizHistoryDTO
    {
        public int QuizId { get; set; }
        public string SectionName { get; set; }
        public string QuizName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DoneDate { get; set; }
        public int TimeSpent { get; set; }
    }
}