using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public int? SectionId { get; set; }
        [ForeignKey("SectionId")]
        public virtual Section Section { get; set; }
        public string PublicId { get; set; }
        public string QuizPhoto { get; set; }
        public string QuizName { get; set; }
        public int DifficultLevel { get; set; }
        public int ExpGain { get; set; }
        public int Enrolled { get; set; }
        public int DurationTime { get; set; }
        public bool RequireLogin { get; set; }
        public virtual IEnumerable<QuizQuestion> Questions { get; set; }

    }
}