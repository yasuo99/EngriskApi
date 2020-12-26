using Microsoft.AspNetCore.Http;

namespace Engrisk.DTOs.Quiz
{
    public class QuizCreateDTO
    {
        public IFormFile File { get; set; }
        public int SectionId { get; set; }
        public string QuizName { get; set; }
        public int DifficultLevel { get; set; }
        public int ExpGain { get; set; }
        public int DurationTime { get; set; }
    }
}