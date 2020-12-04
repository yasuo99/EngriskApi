

using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Engrisk.DTOs
{
    public class QuestionDTO
    {
        public int QuizId { get; set; }
        public int Id { get; set; }
        [JsonIgnore]
        public IFormFile File { get; set; }
        [JsonIgnore]
        public IFormFile Audio { get; set; }
        public string PhotoUrl { get; set; }
        public string Content { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public bool IsListeningQuestion { get; set; }
        public bool IsFillOutQuestion { get; set; }
        public int Score { get; set; }
    }
}