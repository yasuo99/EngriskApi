using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Engrisk.Controllers
{
    [Route("api/v1/[Controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        private readonly ICRUDRepo _repo;
        private readonly CloudinaryDotNet.Account account;
        private readonly CloudinaryDotNet.Cloudinary _cloudinary;
        private readonly CloudinaryHelper _cloudHelper;
        public PagesController(ICRUDRepo repo, IOptions<CloudinarySettings> cloudinarySettings)
        {
            account = new CloudinaryDotNet.Account(){
                ApiKey = cloudinarySettings.Value.ApiKey,
                ApiSecret = cloudinarySettings.Value.ApiSecret,
                Cloud = cloudinarySettings.Value.CloudName
            };
            _cloudinary = new CloudinaryDotNet.Cloudinary(account);
            _cloudHelper = new CloudinaryHelper(_cloudinary);
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBanner(){
            var banners = await _repo.GetAll<Banner>();
            return Ok(banners);
        }
        [HttpPost]
        public async Task<IActionResult> CreateBanner(BannerDTO banner){
            var file = banner.File;
            var result = _cloudHelper.UploadImage(file);
            if(result != null){
                 var createdBanner = new Banner(){
                    PublicId = result.GetType().GetProperties().First(prop => prop.Name == "PublicId").GetValue(result,null).ToString(),
                    PhotoUrl = result.GetType().GetProperties().First(prop => prop.Name == "PhotoUrl").GetValue(result,null).ToString(),
                    IsPublished = false
                };
                if(await _repo.SaveAll()){
                    return Ok();
                }
                return StatusCode(500);
            }
            return StatusCode(500);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBanner(int id){
            var bannerFromDb = await _repo.GetOneWithCondition<Banner>(banner => banner.Id == id);
            if(bannerFromDb == null)
            {
                return NotFound();
            }
            if(_cloudHelper.DeleteImage(bannerFromDb.PublicId)){
                return NoContent();
            }
            return StatusCode(500);
        }
    }
}