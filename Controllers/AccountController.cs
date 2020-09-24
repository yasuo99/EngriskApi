using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Engrisk.Controllers
{
    
    [ApiController]
    [Route("api/[Controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthRepo _repo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly Cloudinary cloundinary;
        public AccountController(IAuthRepo repo, IMapper mapper, IConfiguration config)
        {
            _config = config;
            _mapper = mapper;
            _repo = repo;
            var account = new CloudinaryDotNet.Account(){
                ApiKey = config.Get
            }
        }
        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetAccountDetail(int id)
        {
            return Ok();
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(AccountForRegisterDTO accountForRegister)
        {
            if(_repo.Exists(accountForRegister.Email))
            {
                return BadRequest("Email already registed");
            }
            byte[] passwordHashed, passwordSalt;
            HashPassword(accountForRegister.Password, out passwordHashed, out passwordSalt);
            var account = new Account()
            {
                Username = accountForRegister.Username,
                PasswordHashed = passwordHashed,
                PasswordSalt = passwordSalt,
                Fullname = accountForRegister.Fullname,
                Address = accountForRegister.Address,
                Email = accountForRegister.Email
            };
            await _repo.CreateAccount(account);
            if (await _repo.SaveAll())
            {
                return Ok(account);
            }
            return StatusCode(500);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(AccountForLoginDTO accountLogin)
        {
            var accountFromDb = await _repo.GetAccountDetail(accountLogin.Email);
            if (accountFromDb == null)
            {
                return BadRequest("Wrong email or password");
            }
            if (ComparePassword(accountLogin.Password, accountFromDb.PasswordHashed, accountFromDb.PasswordSalt))
            {
                var token = CreateToken(accountFromDb);
                return Ok(new {
                    Token = token
                });
            }
            return Unauthorized();
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateInfor(int id, AccountForUpdateDTO accountUpdate)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var accountFromDb = await _repo.GetAccountDetail(id);
            if(accountFromDb == null)
            {
                return NotFound();
            }
            _mapper.Map(accountFromDb,accountUpdate);
            if(await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Error on updating account information");
        }

        private string CreateToken(Account accountFromDb)
        {
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,accountFromDb.Id.ToString()),
                new Claim(ClaimTypes.Name,accountFromDb.Username)
            };
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config.GetSection("Appsettings:Token").Value));
            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512);
            var tokenDescriptor = new SecurityTokenDescriptor(){
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool ComparePassword(string password, byte[] passwordHashed, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var tempPasswordHashed = hmac.ComputeHash(Encoding.ASCII.GetBytes(password));
                if (passwordHashed.Length != tempPasswordHashed.Length)
                {
                    return false;
                }
                for (int i = 0; i < passwordHashed.Length; i++)
                {
                    if (tempPasswordHashed[i] != passwordHashed[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        private void HashPassword(string password, out byte[] passwordHashed, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHashed = hmac.ComputeHash(Encoding.ASCII.GetBytes(password));
            }
        }
    }
}