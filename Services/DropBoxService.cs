using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Dropbox.Api;
using Dropbox.Api.Files;
using Engrisk.DTOs;
using Engrisk.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Engrisk.Services
{
    public class DropBoxService : IUploadService
    {
        private readonly DropboxClient _client;
        public DropBoxService(IOptions<DropBoxSettings> dropBoxSettings)
        {
            _client = new DropboxClient(dropBoxSettings.Value.AccessToken);
        }
        public async Task<DropboxDTO> UploadFile(IFormFile file, string folder)
        {
            if (file.Length > 0)
            {
                using (var fileStream = file.OpenReadStream())
                {
                    var result = await _client.Files.UploadAsync(
                        folder + "/" + file.FileName,
                        WriteMode.Overwrite.Instance,
                        body: fileStream
                    );
                    string sharedUrl = "";
                    try
                    {
                        var sharedResult = await _client.Sharing.CreateSharedLinkWithSettingsAsync(folder + "/" + file.FileName);
                        sharedUrl = sharedResult.Url;
                    }
                    catch (DropboxException ex)
                    {
                        var sharedResult = await _client.Sharing.ListSharedLinksAsync(folder + "/" + file.FileName);
                        sharedUrl = sharedResult.Links.First().Url;
                    }
                    
                    _client.Dispose();
                    if (!string.IsNullOrEmpty(result.Rev))
                    {
                        return new DropboxDTO(){
                            Id = result.Id,
                            FileName = result.Name,
                            SharedUrl = sharedUrl
                        };
                    }
                    return null;
                }
            }
            return null;
        }
    }
}