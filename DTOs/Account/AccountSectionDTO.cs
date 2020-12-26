using System;

namespace Engrisk.DTOs
{
    public class AccountSectionDTO
    {
        public int AccountId { get; set; }
        public int QuizDoneCount { get; set; }
        public DateTime Start_At { get; set; }
        public DateTime Done_At { get; set; }
    }
}