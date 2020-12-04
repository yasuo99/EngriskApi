using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Engrisk.Models
{
    public class Document
    {
        public int Id { get; set; }
        [JsonIgnore]
        public IFormFile File { get; set; }
        public string Filename { get; set; }
        public string Title { get; set; }
        public string FileLink { get; set; }
        public bool Verified { get; set; }
        public DateTime Inserted { get; set; }
    }
}