using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Engrisk.Helper
{
    public class CloudinaryHelper
    {
        private readonly Cloudinary _cloud;
        public CloudinaryHelper(Cloudinary cloud)
        {
            _cloud = cloud;
        }
        public object UploadImage(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var fileStream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, fileStream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloud.Upload(uploadParams);
                };
            }
            if(uploadResult.StatusCode == System.Net.HttpStatusCode.Created){
                return new {
                    PublicId = uploadResult.PublicId,
                    PublicUrl = uploadResult.Url.ToString()
                };
            }
            return null;
        }
        public bool DeleteImage(string publicId){
            var deletionParams = new DeletionParams(publicId);
            var result = _cloud.Destroy(deletionParams);
            if(result.Result != "OK"){
                return false;
            }
            return true;
        }
    }
}