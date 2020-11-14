using System;
using System.Buffers;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Engrisk.Data;
using Engrisk.DTOs;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Engrisk.Controllers
{

    [ApiController]
    [Route("api/v1/[Controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly IAuthRepo _repo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private Cloudinary _cloud;
        private readonly ICRUDRepo _cRUDRepo;
        private readonly UserManager<Models.Account> _userManager;
        private readonly RoleManager<Models.Role> _roleManager;
        private readonly SignInManager<Models.Account> _signinManager;
        public AccountsController(IAuthRepo repo, ICRUDRepo cRUDRepo,
        IMapper mapper, IConfiguration config, IOptions<CloudinarySettings> cloudinarySettings,

        UserManager<Models.Account> userManager, RoleManager<Models.Role> roleManager,
        SignInManager<Models.Account> signinManager)
        {
            _roleManager = roleManager;
            _signinManager = signinManager;
            _userManager = userManager;
            _cRUDRepo = cRUDRepo;
            _config = config;
            _mapper = mapper;
            _repo = repo;
            var account = new CloudinaryDotNet.Account()
            {
                Cloud = cloudinarySettings.Value.CloudName,
                ApiKey = cloudinarySettings.Value.ApiKey,
                ApiSecret = cloudinarySettings.Value.ApiSecret
            };
            _cloud = new Cloudinary(account);
        }
        [HttpGet]
        [Authorize(Roles = "superadmin")]
        public async Task<IActionResult> GetAll([FromQuery] SubjectParams subjectParams)
        {
            int id = -1;
            if (User.FindFirst(ClaimTypes.NameIdentifier) != null)
            {
                id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            }
            var account = await _repo.GetAccountDetail(id);
            var role = await _userManager.GetRolesAsync(account);
            var accounts = await _repo.GetAll(subjectParams);
            var temp = accounts.Where(account => account.Id != id);
            var returnAccounts = _mapper.Map<IEnumerable<AccountDetailDTO>>(temp);
            return Ok(returnAccounts);
        }
        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetAccountDetail(int id)
        {
            var user = await _repo.GetAccountDetail(id);
            if (user == null)
            {
                return NotFound();
            }
            var returnUser = _mapper.Map<AccountDetailDTO>(user);
            return Ok(returnUser);
        }
        [HttpPost("validation")]
        public async Task<IActionResult> Validation(AccountForRegisterDTO accountRegister)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, new
                {
                    errors = ModelState.Select(error => error.Value.Errors).Where(c => c.Count > 0).ToList()
                });
            }
            var validationUnique = new Dictionary<dynamic, dynamic>();
            if (_repo.Exists(accountRegister.Username))
            {
                validationUnique.Add("Username", "Username already used");
            }
            if (_repo.Exists(accountRegister.Email))
            {
                validationUnique.Add("Email", "Email already used");
            }
            if (_repo.Exists(accountRegister.PhoneNumber))
            {
                validationUnique.Add("Phone", "Phone number already used");
            }
            return StatusCode(400, new
            {
                errors = validationUnique
            });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(AccountForRegisterDTO accountForRegister)
        {
            if (_repo.Exists(accountForRegister.Email) || _repo.Exists(accountForRegister.Username))
            {
                return Conflict();
            }
            // byte[] passwordHashed, passwordSalt;
            // HashPassword(accountForRegister.Password, out passwordHashed, out passwordSalt);
            var account = new Engrisk.Models.Account()
            {
                UserName = accountForRegister.Username,
                Fullname = accountForRegister.Fullname,
                Address = accountForRegister.Address,
                Email = accountForRegister.Email,
                DateOfBirth = accountForRegister.DateOfBirth,
                PhoneNumber = accountForRegister.PhoneNumber
            };
            var accountCreated = await _userManager.CreateAsync(account, accountForRegister.Password);
            if (accountCreated.Succeeded)
            {
                foreach (var role in accountForRegister.Roles)
                {
                    await _userManager.AddToRoleAsync(account, role);
                }
                return CreatedAtAction("GetAccountDetail", new { id = account.Id }, account);
            }
            return BadRequest();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(AccountForLoginDTO accountLogin)
        {
            Models.Account accountFromDb;
            if (accountLogin.LoginMethod.Contains("@"))
            {
                accountFromDb = await _userManager.FindByEmailAsync(accountLogin.LoginMethod);
            }
            else
            {
                accountFromDb = await _repo.GetAccountDetail(accountLogin.LoginMethod);
            }
            if(accountFromDb.IsDisabled)
            {
                return BadRequest(new {
                    error = "Tài khoản của bạn đã bị khóa vui lòng liên hệ admin!"
                });
            }
            var result = await _signinManager.CheckPasswordSignInAsync(accountFromDb, accountLogin.Password, false);
            if (result.Succeeded)
            {
                var accountForDetail = _mapper.Map<AccountDetailDTO>(accountFromDb);
                var token = CreateToken(accountFromDb).Result;
                return Ok(new
                {
                    account = accountForDetail,
                    token = token
                });
            }
            else
            {
                return BadRequest("Wrong email or password");
            }
            // if (ComparePassword(accountLogin.Password, accountFromDb.PasswordHashed, accountFromDb.PasswordSalt))
            // {
            //     var token = CreateToken(accountFromDb);
            //     var returnAccount = _mapper.Map<AccountDetailDTO>(accountFromDb);
            //     return Ok(new
            //     {
            //         Token = token,
            //         Account = returnAccount
            //     });
            // }
        }
        [HttpPut("{accountId}")]
        public async Task<IActionResult> UpdateAccount(int accountId, [FromBody] AccountForUpdateDTO accountUpdate)
        {
            // if (accountId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            // {
            //     return Unauthorized();
            // }
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if (accountFromDb == null)
            {
                return NotFound();
            }
            _mapper.Map(accountUpdate, accountFromDb);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Error on updating account information");
        }
        [HttpPut("{accountId}/ban")]
        public async Task<IActionResult> BanAccount(int accountId, [FromBody] int hour){
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if(accountFromDb == null){
                return NotFound();
            }
            accountFromDb.Locked = DateTime.Now.AddHours(hour);
            if(await _repo.SaveAll()){
                return NoContent();
            }
            return StatusCode(500);
        }
        [HttpPut("{accountId}/disable")]
        public async Task<IActionResult> DisableAccount(int accountId){
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if(accountFromDb == null){
                return NotFound();
            }
            accountFromDb.IsDisabled = true;
            if(await _repo.SaveAll()){
                return NoContent();
            }
            return StatusCode(500);
        }
        [HttpPost("{accountId}/roles")]
        public async Task<IActionResult> EditRole(int accountId, [FromBody] IEnumerable<string> roles)
        {
            try
            {
                var accountFromDb = await _repo.GetAccountDetail(accountId);
                if(accountFromDb == null)
                {
                    return NotFound();
                }
                var result = await _userManager.AddToRolesAsync(accountFromDb,roles);
                if (result.Succeeded)
                {
                    return Ok();
                }
                return StatusCode(500);
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
        [HttpDelete("{accountId}/roles/{roleId}")]
        public async Task<IActionResult> RemoveRole(int accountId, int roleId){
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if(accountFromDb == null)
            {
                return NotFound();
            }
            var roleFromDb = await _cRUDRepo.GetOneWithCondition<Models.Role>(role => role.Id == roleId);
            if(roleFromDb == null){
                return NotFound();
            }
            var result = await _userManager.RemoveFromRoleAsync(accountFromDb,roleFromDb.Name);
            if(result.Succeeded){
                return NoContent();
            }
            return StatusCode(500);
        }
        [Authorize]
        [HttpPost("{accountId}/attendance")]
        public async Task<IActionResult> Attendance(int accountId)
        {
            if (accountId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if (accountFromDb == null)
            {
                return NotFound();
            }
            var attendance = await _cRUDRepo.GetAll<AccountAttendance>(acc => acc.AccountId == accountId);
            var tempmapper = _mapper.Map<AttendanceDTO>(attendance.FirstOrDefault());
            var temp = _mapper.Map<IEnumerable<AttendanceDTO>>(attendance);
            var returnAttendance = temp.Where(month => month.Date.Month == DateTime.Now.Month);
            var tempList = new List<AttendanceDTO>();
            for (int i = 1; i <= DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month); i++)
            {
                var isTookAttendance = returnAttendance.FirstOrDefault(date => date.Date.Day == i);
                if (isTookAttendance != null)
                {
                    isTookAttendance.IsTookAttendance = true;
                }
                else
                {
                    var tempDate = DateTime.Now.Year + "-" + DateTime.Now.Month.ToString() + "-" + i.ToString();
                    var tempAttendance = new AttendanceDTO()
                    {
                        Date = DateTime.Parse(tempDate),
                        IsTookAttendance = false
                    };
                    tempList.Add(tempAttendance);
                }
            }
            var attendanceResult = returnAttendance.ToList();
            attendanceResult.AddRange(tempList);
            if (attendance.Any(att => att.Date.CompareDate(DateTime.Now)))
            {
                return Ok(new
                {
                    attendance = attendanceResult
                });
            }
            var attendanceGift = await _cRUDRepo.GetOneWithCondition<Attendance>(gift => gift.Id == DateTime.Now.Day);
            var attend = new AccountAttendance()
            {
                AccountId = accountId,
                AttendanceId = DateTime.Now.Day,
                Date = DateTime.Now
            };
            _cRUDRepo.Create(attend);
            switch (attendanceGift.Type)
            {
                case "Point":
                    accountFromDb.Point += attendanceGift.Value;
                    break;
                case "Exp":
                    accountFromDb.Exp += attendanceGift.Value;
                    break;
                case "X2 Exp":
                    var item = await _cRUDRepo.GetOneWithCondition<Item>(item => item.ItemName.ToLower().Equals("x2 exp"));
                    for (int i = 0; i < attendanceGift.Value; i++)
                    {
                        var AccountStorage = new AccountStorage()
                        {
                            AccountId = accountId,
                            ItemId = item.Id
                        };
                        _cRUDRepo.Create(AccountStorage);
                    }
                    break;
                default:
                    break;
            }
            if (await _cRUDRepo.SaveAll())
            {
                return Ok(new
                {
                    attendance = attendanceResult
                });
            }
            return BadRequest();
        }
        [HttpPost("{accountId}/items")]
        public async Task<IActionResult> BuyItems(int accountId, [FromBody] IEnumerable<Item> items)
        {
            if (accountId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            foreach (var temp in items)
            {
                var itemFromDb = await _cRUDRepo.GetOneWithCondition<Item>(item => item.Id == temp.Id);
                if (itemFromDb == null)
                {
                    return NotFound();
                }
                var accountFromDb = await _repo.GetAccountDetail(accountId);
                if (accountFromDb.Point < itemFromDb.Price)
                {
                    await _repo.SaveAll();
                    return BadRequest(new
                    {
                        error = "Số dư tài khoản không đủ"
                    });
                }
                var buy = new AccountStorage()
                {
                    AccountId = accountId,
                    ItemId = temp.Id,
                    PurchasedDate = DateTime.Now
                };
                _cRUDRepo.Create(buy);
                accountFromDb.Point -= itemFromDb.Price;
            }
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPost("{accountId}/items/{itemId}")]
        [Authorize(Roles = "learner")]
        public async Task<IActionResult> BuyItem(int accountId, int itemId)
        {
            if (accountId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var itemFromDb = await _cRUDRepo.GetOneWithCondition<Item>(item => item.Id == itemId);
            if (itemFromDb == null)
            {
                return NotFound();
            }
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if (accountFromDb.Point < itemFromDb.Price)
            {
                return BadRequest(new
                {
                    error = "Số dư tài khoản không đủ"
                });
            }
            var buy = new AccountStorage()
            {
                AccountId = accountId,
                ItemId = itemId,
                PurchasedDate = DateTime.Now
            };
            _cRUDRepo.Create(buy);
            accountFromDb.Point -= itemFromDb.Price;
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Error on buying");
        }
        [HttpPut("{accountId}/topup")]
        public async Task<IActionResult> Topup(int accountId, [FromBody] int topupAmount)
        {
            var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (accountId != id)
            {
                return Unauthorized();
            }
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            accountFromDb.Point += topupAmount;
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPut("{accountId}/use/{itemId}")]
        public async Task<IActionResult> UseItem(int accountId, int itemId)
        {
            if (accountId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if (accountFromDb == null)
            {
                return Unauthorized();
            }
            var itemFromDb = await _cRUDRepo.GetOneWithCondition<Item>(item => item.Id == itemId);
            if (itemFromDb == null)
            {
                return NotFound();
            }
            AccountStorage item = new AccountStorage();
            switch (itemFromDb.ItemName.ToLower())
            {
                case "x2 exp":
                    item = await _cRUDRepo.GetOneWithConditionTracking<AccountStorage>(store => store.Item.ItemName.ToLower().Equals("x2 exp"));
                    break;
                case "x2 point":
                    item = await _cRUDRepo.GetOneWithConditionTracking<AccountStorage>(store => store.Item.ItemName.ToLower().Equals("x2 point"));
                    break;
                case "keep active":
                    item = await _cRUDRepo.GetOneWithConditionTracking<AccountStorage>(store => store.Item.ItemName.ToLower().Equals("keep active"));
                    break;
                default:
                    break;
            }
            item.IsUsing = true;
            item.UseDate = DateTime.Now;
            item.OverDate = DateTime.Now.AddMinutes(item.Item.Usage);
            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpGet("{accountId}/items")]
        public async Task<IActionResult> GetItems(int accountId)
        {
            if (accountId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var itemsOfAccount = await _cRUDRepo.GetAll<AccountStorage>(account => account.AccountId == accountId, "Item");
            return Ok(itemsOfAccount);
        }
        [HttpPost("{accountId}/items/{itemId}/timeout")]
        public async Task<IActionResult> ItemTimeout(int accountId, int itemId)
        {
            if (accountId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var item = await _cRUDRepo.GetOneWithCondition<AccountStorage>(item => item.ItemId == itemId);
            if (item == null)
            {
                return NotFound();
            }
            _cRUDRepo.Delete(item);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return StatusCode(500);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateInfor(int id, AccountForUpdateDTO accountUpdate)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var accountFromDb = await _repo.GetAccountDetail(id);
            if (accountFromDb == null)
            {
                return NotFound();
            }
            _mapper.Map(accountFromDb, accountUpdate);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Error on updating account information");
        }
        [HttpPost("{accountId}/photo")]
        public async Task<IActionResult> UploadPhoto(int accountId, [FromForm] PhotoDTO photo)
        {
            if (accountId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var account = await _repo.GetAccountDetail(accountId);
            if (account.PublicId != null)
            {
                await DeletePhoto(account);
            }
            var file = photo.File;
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
            account.PhotoUrl = uploadResult.Url.ToString();
            account.PublicId = uploadResult.PublicId.ToString();
            if (await _repo.SaveAll())
            {
                return Ok(new
                {
                    photoUrl = account.PhotoUrl
                });
            }
            return BadRequest("Error on upload photo");
        }
        public async Task<bool> DeletePhoto(Engrisk.Models.Account account)
        {
            var deleteParams = new DeletionParams(account.PublicId);
            var result = _cloud.Destroy(deleteParams);
            if (result.Result != "OK")
            {
                return false;
            }
            account.PhotoUrl = null;
            account.PublicId = null;
            if (await (_repo.SaveAll()))
            {
                return true;
            };
            return false;
        }
        private async Task<string> CreateToken(Engrisk.Models.Account accountFromDb)
        {
            var roles = await _userManager.GetRolesAsync(accountFromDb);
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier,accountFromDb.Id.ToString()),
                new Claim(ClaimTypes.Name,accountFromDb.UserName)
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