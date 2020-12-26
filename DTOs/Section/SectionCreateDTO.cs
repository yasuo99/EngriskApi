using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Engrisk.DTOs
{
    public class SectionCreateDTO
    {
        public IFormFile File { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        [Required]
        public string SectionName { get; set; }
        public string Description { get; set; }
        public bool RequireLogin { get; set; }
        public int DPA { get; set; }
    }
}