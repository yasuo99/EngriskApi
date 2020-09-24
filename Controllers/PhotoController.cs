using System.Security.Claims;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Engrisk.Controllers
{
    [ApiController]
    [Route("api/accounts/{accountId}/photos")]
    public class PhotoController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private Cloudinary _cloudinary;
        public PhotoController(ICRUDRepo repo, IOptions<CloudinarySettings> cloudinarySettings)
        {
            _repo = repo;
            var account = new CloudinaryDotNet.Account()
            {
                Cloud = cloudinarySettings.Value.CloundName,
                ApiKey = cloudinarySettings.Value.ApiKey,
                ApiSecret = cloudinarySettings.Value.ApiSecret,
            };
            _cloudinary = new Cloudinary(account);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> UploadPhoto(int accountId, [FromForm] PhotoDTO photo)
        {
            if (accountId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var account = await _repo.GetOneWithCondition<Engrisk.Models.Account>(account => account.Id == accountId);
            var file = photo.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var fileStream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams(){
                        File = new FileDescription(file.Name, fileStream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                };
            }
            account.PhotoUrl = uploadResult.Url.ToString();
            account.PublicId 
        }
    }
}