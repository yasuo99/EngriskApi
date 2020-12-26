

using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Engrisk.DTOs
{
    public class QuestionDTO
    {
        public int Id { get; set; }
        public string Audio { get; set; }
        public string PhotoUrl { get; set; }
        public string Content { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public string ToeicPart { get; set; }
        public bool IsListeningQuestion { get; set; }
        public bool IsFillOutQuestion { get; set; }
        public bool IsQuizQuestion { get; set; }
        public int Score { get; set; }
    }
}