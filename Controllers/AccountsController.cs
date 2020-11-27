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
using Engrisk.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Engrisk.Controllers
{

    [ApiController]
    [Route("api/v1/[Controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly IAuthRepo _repo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IAuthService _googleService;
        private readonly IAuthService _facebookService;
        private CloudinaryHelper _cloud;
        private readonly ICRUDRepo _cRUDRepo;
        private readonly UserManager<Models.Account> _userManager;
        private readonly RoleManager<Models.Role> _roleManager;
        private readonly SignInManager<Models.Account> _signinManager;
        public AccountsController(IAuthRepo repo, ICRUDRepo cRUDRepo,
        IMapper mapper, IConfiguration config, IOptions<CloudinarySettings> cloudinarySettings, Func<ServiceEnum, IAuthService> serviceResolver,

        UserManager<Models.Account> userManager, RoleManager<Models.Role> roleManager,
        SignInManager<Models.Account> signinManager)
        {
            _roleManager = roleManager;
            _signinManager = signinManager;
            _userManager = userManager;
            _cRUDRepo = cRUDRepo;
            _config = config;
            _googleService = serviceResolver(ServiceEnum.Google);
            _facebookService = serviceResolver(ServiceEnum.Facebook);
            _mapper = mapper;
            _repo = repo;
            var account = new CloudinaryDotNet.Account()
            {
                Cloud = cloudinarySettings.Value.CloudName,
                ApiKey = cloudinarySettings.Value.ApiKey,
                ApiSecret = cloudinarySettings.Value.ApiSecret
            };
            _cloud = new CloudinaryHelper(account);
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
            Response.AddPaginationHeader(accounts.CurrentPage, accounts.PageSize, accounts.TotalItems, accounts.TotalPages);
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
            if (accountFromDb == null)
            {
                return BadRequest("Tài khoản không tồn tại");
            }
            if (accountFromDb.IsDisabled)
            {
                return BadRequest(new
                {
                    error = "Tài khoản của bạn đã bị khóa vui lòng liên hệ admin!"
                });
            }
            var result = await _signinManager.CheckPasswordSignInAsync(accountFromDb, accountLogin.Password, false);
            if (result.Succeeded)
            {
                var accountForDetail = _mapper.Map<AccountDetailDTO>(accountFromDb);
                var token = await _repo.GenerateToken(accountFromDb,ipAddress());
                setTokenCookie(token.RefreshToken);
                return Ok(new
                {
                    account = accountForDetail,
                    token = token.Token
                });
            }
            else
            {
                return BadRequest("Sai mật khẩu");
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
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(){
            var refreshToken = Request.Cookies["refreshToken"];
            var response = await _repo.RefreshToken(refreshToken, ipAddress());

            if (response == null)
                return Unauthorized(new { message = "Invalid token" });

            setTokenCookie(response.Token);

            return Ok(response);
        }
        [HttpPost("revoke-token")]
        public async Task<IActionResult> RevokeToken([FromBody] RequestTokenDTO requestToken)
        {
            var token = requestToken.RequestToken ?? Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Token is required" });

            var response = await _repo.RevokeToken(token, ipAddress());

            if (!response)
                return NotFound(new { message = "Token not found" });

            return Ok(new { message = "Token revoked" });
        }
        [HttpGet("{accountId}/refresh-tokens")]
        public async Task<IActionResult> GetRefreshToken(int accountId){
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if(accountFromDb == null){
                return NotFound();
            }
            return Ok(accountFromDb.RefreshTokens);
        }
        [HttpPost("login/google")]
        public async Task<IActionResult> GoogleLogin([FromBody] UserLoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(it => it.Errors).Select(it => it.ErrorMessage));
            var account = await _googleService.Authenticate(request);
            if (account == null)
            {
                return BadRequest("Phiên đăng nhập hết hạn");
            }
            var token = await _repo.GenerateToken(account,ipAddress());
            var accountForDetail = _mapper.Map<AccountDetailDTO>(account);
            return Ok(new
            {
                account = accountForDetail,
                token = token.Token
            });
        }
        [HttpPost("login/facebook")]
        public async Task<IActionResult> FacebookLogin([FromBody] UserLoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(it => it.Errors).Select(it => it.ErrorMessage));
            }
            var account = await _facebookService.Authenticate(request);
            if (account == null)
            {
                return BadRequest();
            }
            var accountForDetail = _mapper.Map<AccountDetailDTO>(account);
            var token = await _repo.GenerateToken(account,ipAddress());
            return Ok(new
            {
                account = accountForDetail,
                token = token.Token
            });
        }
        [HttpPut("{accountId}/changepw")]
        public async Task<IActionResult> UpdatePassword(int accountId, [FromBody] string newPassword)
        {
            return Ok();
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
        [HttpPut("{accountId}/avatar")]
        public async Task<IActionResult> UpdateAvatar(int accountId, [FromForm] PhotoDTO photoDTO){
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if(accountFromDb == null){
                return NotFound();
            }
            if(string.IsNullOrEmpty(accountFromDb.PhotoUrl)){
                _cloud.DeleteImage(accountFromDb.PublicId);
            }
            var result = _cloud.UploadImage(photoDTO.File);
            accountFromDb.PhotoUrl = result.PublicUrl;
            accountFromDb.PublicId = result.PublicId;
            if(await _repo.SaveAll()){
                return Ok();
            }
            return StatusCode(500);
        }
        [HttpPut("{accountId}/ban")]
        public async Task<IActionResult> BanAccount(int accountId, [FromBody] int hour)
        {
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if (accountFromDb == null)
            {
                return NotFound();
            }
            accountFromDb.Locked = DateTime.Now.AddHours(hour);
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return StatusCode(500);
        }
        [HttpPut("{accountId}/disable")]
        public async Task<IActionResult> DisableAccount(int accountId)
        {
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if (accountFromDb == null)
            {
                return NotFound();
            }
            accountFromDb.IsDisabled = true;
            if (await _repo.SaveAll())
            {
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
                if (accountFromDb == null)
                {
                    return NotFound();
                }
                var result = await _userManager.AddToRolesAsync(accountFromDb, roles);
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
        public async Task<IActionResult> RemoveRole(int accountId, int roleId)
        {
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            if (accountFromDb == null)
            {
                return NotFound();
            }
            var roleFromDb = await _cRUDRepo.GetOneWithCondition<Models.Role>(role => role.Id == roleId);
            if (roleFromDb == null)
            {
                return NotFound();
            }
            var result = await _userManager.RemoveFromRoleAsync(accountFromDb, roleFromDb.Name);
            if (result.Succeeded)
            {
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
        [HttpPut("{accountId}/topup/paypal")]
        public async Task<IActionResult> TopupWithPaypal(int accountId, [FromBody] PaypalDTO paypal)
        {
            var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (accountId != id)
            {
                return Unauthorized();
            }
            var accountFromDb = await _repo.GetAccountDetail(accountId);
            accountFromDb.Point += paypal.Payer.Purchase.Amount.Value;

            if (await _repo.SaveAll())
            {
                var topupHistory = new TopupHistory()
                {
                    OrderId = paypal.Id,
                    AccountId = accountFromDb.Id,
                    TopupDate = DateTime.Now,
                    PaymentMethod = "Paypal",
                    Amount = paypal.Payer.Purchase.Amount.Value,
                    Currency = paypal.Payer.Purchase.Amount.Currency,
                    Status = paypal.Status
                };
                _cRUDRepo.Create(topupHistory);
                if (await _cRUDRepo.SaveAll())
                {
                    return Ok();
                }
                return StatusCode(500);
            }
            return StatusCode(500);
        }
        // [HttpPut("{accountId}/topup/stripe")]
        // public async Task<IActionResult> TopupWithStripe(int accountId){

        // }
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
            var result = _cloud.UploadImage(photo.File);
            account.PhotoUrl = result.PublicUrl;
            account.PublicId = result.PublicId;
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
            if (_cloud.DeleteImage(account.PublicId))
            {
                account.PhotoUrl = null;
                account.PublicId = null;
                if (await (_repo.SaveAll()))
                {
                    return true;
                };
                return false;
            }
            return false;
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
        private void setTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}