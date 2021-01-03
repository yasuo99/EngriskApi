using System;
using System.Collections.Generic;
using Engrisk.DTOs.Exam;
using Engrisk.Models;

namespace Engrisk.DTOs
{
    public class ExamDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Detail { get; set; }
        public int ExpGain { get; set; }
        public int Price { get; set; }
        public int TotalListening { get; set; }
        public int TotalReading { get; set; }
        public int TotalScore{get;set;}
        public int Duration { get; set; }
        public bool IsNew { get; set; }
        public double Start_At { get; set; }
        public virtual IEnumerable<QuestionDTO> Questions { get; set; }
        public virtual IEnumerable<ExamHistoryDTO> ExamHistories { get; set; }
    }
}