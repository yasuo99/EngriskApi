using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Engrisk.Data
{
    public class AuthRepo : IAuthRepo
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<Account> _userManager;
        private readonly IConfiguration _config;
        public AuthRepo(ApplicationDbContext db, UserManager<Account> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _db = db;
            _config = config;
        }
        public async Task<Account> CreateAccount(Account account)
        {
            await _userManager.CreateAsync(account);
            return account;
        }

        public async Task DeleteAccount(int id)
        {
            var accountFromDb = _db.Accounts.FirstOrDefault(u => u.Id == id);
            await _userManager.DeleteAsync(accountFromDb);
        }

        public async Task DeleteAccount(string username)
        {
            var accountFromDb = _db.Accounts.FirstOrDefault(u => u.UserName.Equals(username));
            await _userManager.DeleteAsync(accountFromDb);
        }

        public bool Exists(string identify)
        {
            return _db.Accounts.Any(u => u.Email.Equals(identify) || u.UserName.Equals(identify) || u.PhoneNumber.Equals(identify));
        }

        public RefreshToken GenerateRefreshToken(string ipAddress)
        {
            using(var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomBytes),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow,
                    CreatedByIp = ipAddress
                };
            }
        }
        public async Task<AuthenticateRequestDTO> GenerateToken(Account account, string ipAddress)
        {
            var roles = await _userManager.GetRolesAsync(account);
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier,account.Id.ToString()),
                new Claim(ClaimTypes.Name,account.UserName)
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:TokenSecret").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(60),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var secureToken = tokenHandler.CreateToken(tokenDescriptor);
            
            var token= tokenHandler.WriteToken(secureToken);
            var refreshToken = GenerateRefreshToken(ipAddress);
            account.RefreshTokens.Add(refreshToken);
            _db.Update(account);
            await _db.SaveChangesAsync();
            return new AuthenticateRequestDTO(){
                Token = token,
                RefreshToken = refreshToken.Token
            };
        }

        public async Task<Account> GetAccountDetail(string identify)
        {
            var accountFromDb = await _db.Accounts.FirstOrDefaultAsync(u => u.UserName.Equals(identify) || u.Email.Equals(identify));
            return accountFromDb;
        }

        public async Task<Account> GetAccountDetail(int id)
        {
            var accountFromDb = await _db.Accounts.FirstOrDefaultAsync(u => u.Id == id);
            return accountFromDb;
        }

        public async Task<PagingList<Account>> GetAll(SubjectParams subjectParams)
        {
            var account = _db.Accounts.Include(u => u.Histories).AsQueryable();
            return await PagingList<Account>.OnCreateAsync(account, subjectParams.CurrentPage, subjectParams.PageSize);
        }
        public async Task<AuthenticateRequestDTO> RefreshToken(string token, string ipAddress)
        {
            var user = await _db.Accounts.FirstOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token.Equals(token)));
            if(user == null){
                return null;
            }
            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);
            if (!refreshToken.IsActive) return null;
            var newRefreshToken = GenerateRefreshToken(ipAddress);
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            refreshToken.ReplacedByToken = newRefreshToken.Token;
            user.RefreshTokens.Add(newRefreshToken);
            _db.Update(user);
            _db.SaveChanges();

            // generate new jwt
            var jwtToken = await GenerateToken(user,ipAddress);
            return new AuthenticateRequestDTO(){
                Token = jwtToken.Token,
                RefreshToken = jwtToken.RefreshToken
            };
        }

        public async Task<bool> RevokeToken(string token, string ipAddress)
        {
            var user = await _db.Accounts.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));
            
            // return false if no user found with token
            if (user == null) return false;

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            // return false if token is not active
            if (!refreshToken.IsActive) return false;

            // revoke token and save
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            _db.Update(user);
            _db.SaveChanges();
            return true;
        }

        public async Task<bool> SaveAll()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    }
}