using Microsoft.AspNetCore.Http;

namespace Engrisk.DTOs
{
    public class PhotoDTO
    {
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public IFormFile File { get; set; }
    }
}