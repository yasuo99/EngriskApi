using Microsoft.AspNetCore.Http;

namespace Engrisk.DTOs.Section
{
    public class SectionUpdateDTO
    {
        public IFormFile File { get; set; }
        public string SectionName { get; set; }
        public string Description { get; set; }
        public bool RequireLogin { get; set; }
    }
}