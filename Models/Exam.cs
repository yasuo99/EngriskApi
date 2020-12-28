using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class Exam
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Detail { get; set; }
        public DateTime Create_At { get; set; }
        public int Price { get; set; }
        public int Exp { get; set; }
        public int TotalListening { get; set; }
        public int TotalReading { get; set; }
        public int TotalScore{get;set;}
        public int Duration { get; set; }
        public virtual IEnumerable<ExamQuestion> Questions { get; set; }
        public virtual IEnumerable<ExamHistory> ExamHistories { get; set; }
    }
}