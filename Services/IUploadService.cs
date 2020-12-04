using System.Threading.Tasks;
using Engrisk.DTOs;
using Microsoft.AspNetCore.Http;

namespace Engrisk.Services
{
    public interface IUploadService
    {
         Task<DropboxDTO> UploadFile(IFormFile file, string folder);
         Task<bool> DeleteFile(string path, string filename);
    }
}