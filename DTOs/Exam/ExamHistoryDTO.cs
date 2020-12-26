using System;

namespace Engrisk.DTOs.Exam
{
    public class ExamHistoryDTO
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int ExamId { get; set; }
        public string ExamTitle { get; set; }
        public DateTime Start_At { get; set; }
        public DateTime End_At { get; set; }
        public int TotalTime { get; set; }
        public bool IsDoing { get; set; }
        public int Exp { get; set; }
        public int Score { get; set; }
    }
}