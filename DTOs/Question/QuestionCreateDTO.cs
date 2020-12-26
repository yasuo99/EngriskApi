using Microsoft.AspNetCore.Http;

namespace Engrisk.DTOs.Question
{
    public class QuestionCreateDTO
    {
        public IFormFile File { get; set; }
        public IFormFile Audio { get; set; }
        public string PhotoUrl { get; set; }
        public string Content { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public string ToeicPart { get; set; }
        public string Answer { get; set; }
        public string Explaination { get; set; }
        public bool IsListeningQuestion { get; set; }
        public bool IsFillOutQuestion { get; set; }
        public bool IsConcatQuestion { get; set; }
        public bool IsQuizQuestion { get; set; }
        public int Score { get; set; }
    }
}