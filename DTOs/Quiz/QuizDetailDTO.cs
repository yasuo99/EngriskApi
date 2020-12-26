using System.Collections.Generic;
using Engrisk.Models;

namespace Engrisk.DTOs.Quiz
{
    public class QuizDetailDTO
    {
        public int Id { get; set; }
        public int SectionId { get; set; }
        public string SectionName { get; set; }
        public string QuizPhoto { get; set; }
        public string QuizName { get; set; }
        public int DifficultLevel { get; set; }
        public int ExpGain { get; set; }
        public int Enrolled { get; set; }
        public int DurationTime { get; set; }
        public bool RequireLogin { get; set; }
        public int TotalQuestion { get; set; }
    }
}