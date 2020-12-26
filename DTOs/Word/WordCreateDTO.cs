using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Engrisk.DTOs.Word
{
    public class WordCreateDTO
    {
        public string WordCategory { get; set; }
        public IFormFile Audio { get; set; }
        public IFormFile File { get; set; }
        public string WordImg { get; set; }
        public string Eng  { get; set; }
        public string Spelling { get; set; }
        public string Vie { get; set; }
        public virtual IEnumerable<ExampleDTO> Examples{get;set;}
    }
}