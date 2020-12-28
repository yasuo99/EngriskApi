using System.Collections.Generic;
using Engrisk.DTOs.Exam;
using Engrisk.DTOs.Quiz;
using Engrisk.DTOs.Word;

namespace Engrisk.DTOs.Account
{
    public class AccountBlogDTO
    {
        public string PhotoUrl { get; set; }
        public string Email { get; set; }
        public bool IsVerified { get; set; }
        public string Username { get; set; }
        public string Fullname { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsBanned {get;set;}
        public bool  IsDisabled { get; set; }
        public virtual IEnumerable<AccountPostDTO> Posts { get; set; }
        public int WordLearned{ get; set; }
        public int ExamDone { get; set; }
        public int QuizDone { get; set; }
    }
}