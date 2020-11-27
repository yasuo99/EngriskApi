using System.Threading.Tasks;
using Engrisk.Data;
using Engrisk.Helper;
using Engrisk.Models;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace Engrisk.Services
{
    public class GoogleAuthService : IAuthService
    {
        private readonly GoogleAuthConfig _googleConfig;
        private readonly UserManager<Account> _userManager;
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _config;
        public GoogleAuthService(ApplicationDbContext db, IOptions<GoogleAuthConfig> googleConfig, UserManager<Account> userManager, IConfiguration config)
        {
            _db = db;
            _googleConfig = new GoogleAuthConfig()
            {
                ClientId = googleConfig.Value.ClientId,
                ClientSecret = googleConfig.Value.ClientSecret
            };
            _userManager = userManager;
            _config = config;
        }
        public async Task<Account> GetOrCreateExternalLoginUser(string provider, string key, string email, string fullname, string picture)
        {
            var user = await _userManager.FindByLoginAsync(provider, key);
            if (user != null)
            {
                return user;
            }
            var userFromEmail = await _userManager.FindByEmailAsync(email);
            if (userFromEmail == null)
            {
                userFromEmail = new Account()
                {
                    UserName = key,
                    Email = email,
                    PhotoUrl = picture,
                    Fullname = fullname,
                };
                await _userManager.CreateAsync(userFromEmail, _config.GetSection("Defaults:Account:Password").Value);
            }
            if (string.IsNullOrEmpty(userFromEmail.PhotoUrl))
            {
                userFromEmail.PhotoUrl = picture;
                await _db.SaveChangesAsync();
            }
            var userInfo = new UserLoginInfo(provider, key, provider.ToUpperInvariant());
            var loginResult = await _userManager.AddLoginAsync(userFromEmail, userInfo);
            if (loginResult.Succeeded)
            {
                return userFromEmail;
            }
            return null;
        }
        public async Task<Account> Authenticate(UserLoginRequest request)
        {
            try
            {
                Payload payload = await ValidateAsync(request.Token, new ValidationSettings
                {
                    Audience = new[] { _googleConfig.ClientId }
                });
                return await GetOrCreateExternalLoginUser(UserLoginRequest.GoogleProvider, payload.Subject, payload.Email, payload.Name, payload.Picture);
            }
            catch (InvalidJwtException e)
            {
                return null;
            }
        }
    }
}