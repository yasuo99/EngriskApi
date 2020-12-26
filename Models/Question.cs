using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public string Filename { get; set;} 
        public string Audio { get; set; }
        public int ToeicPart { get; set; }
        public string Content { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public string Answer { get; set; }
        public string Explaination { get; set; }
        public bool IsListeningQuestion { get; set; }
        public bool IsFillOutQuestion { get; set; }
        public bool IsConcatQuestion { get; set; }
        public bool IsQuizQuestion { get; set; }
        public DateTime Inserted { get; set; }
        public virtual IEnumerable<QuizQuestion> Quizes { get; set; }
        public virtual IEnumerable<ExamQuestion> Exams { get; set; }
    }
}