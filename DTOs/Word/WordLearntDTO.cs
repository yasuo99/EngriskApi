using System;

namespace Engrisk.DTOs.Word
{
    public class WordLearntDTO
    {
        public int WordId { get; set; }
        public string Eng { get; set; }
        public string WordCategory { get; set; }
        public DateTime LastPractice { get; set; }
    }
}