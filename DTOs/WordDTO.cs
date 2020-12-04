using System.Collections.Generic;
using System.Text.Json.Serialization;
using Engrisk.Models;
using Microsoft.AspNetCore.Http;

namespace Engrisk.DTOs
{
    public class WordDTO
    {
        public int Id { get; set; }
        public string WordCategory { get; set; }
        [JsonIgnore]
        public IFormFile File { get; set; }
        public string WordImg { get; set; }
        public string Eng  { get; set; }
        public string Spelling { get; set; }
        public string Vie { get; set; }
        public virtual IEnumerable<ExampleDTO> Examples{get;set;}
        public virtual IEnumerable<GroupDTO> Groups { get; set; }
    }
}