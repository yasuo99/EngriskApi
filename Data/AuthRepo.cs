using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Engrisk.Helper;
using Engrisk.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Engrisk.Data
{
    public class AuthRepo : IAuthRepo
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<Account> _userManager;
        public AuthRepo(ApplicationDbContext db, UserManager<Account> userManager)
        {
            _userManager = userManager;
            _db = db;
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

        public async Task<bool> SaveAll()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    }
}