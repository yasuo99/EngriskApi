using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Engrisk.Models
{
    public class Word
    {
        public int Id { get; set; }
        public string WordCategory { get; set; }
        public string WordImg { get; set; }
        public string PublicId { get; set; }
        public string Eng  { get; set; }
        public string Spelling { get; set; }
        public string WordVoice { get; set; }
        public string Vie { get; set; }
        public virtual IEnumerable<WordExample> Examples{get;set;}
        public virtual IEnumerable<WordGroup> Groups { get; set; }
        public virtual IEnumerable<WordLearnt> Learned { get; set; }
    }
}