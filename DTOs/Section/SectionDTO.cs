using System.Collections.Generic;
using System.Text.Json.Serialization;
using Engrisk.Models;
using Microsoft.AspNetCore.Http;

namespace Engrisk.DTOs
{
    public class SectionDTO
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string SectionName { get; set; }
        public string Description { get; set; }
        public bool RequireLogin { get; set; }
        public int DPA { get; set; }
        public int TotalQuizzes { get; set; }
    }
}