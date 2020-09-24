using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Engrisk.Models;
using Microsoft.EntityFrameworkCore;

namespace Engrisk.Data
{
    public class AuthRepo : IAuthRepo
    {
        private readonly ApplicationDbContext _db;
        public AuthRepo(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<Account> CreateAccount(Account account)
        {
            _db.Add(account);
            return account;
        }

        public void DeleteAccount(int id)
        {
            var accountFromDb = _db.Accounts.FirstOrDefault(u => u.Id == id);
            _db.Remove(accountFromDb);
        }

        public void DeleteAccount(string username)
        {
            var accountFromDb = _db.Accounts.FirstOrDefault(u => u.Username.Equals(username));
            _db.Remove(accountFromDb);
        }

        public bool Exists(string identify)
        {
            return _db.Accounts.Any(u => u.Email.Equals(identify));
        }

        public async Task<Account> GetAccountDetail(string identify)
        {
            var accountFromDb = await _db.Accounts.FirstOrDefaultAsync(u => u.Username.Equals(identify) || u.Email.Equals(identify));
            return accountFromDb;
        }

        public async Task<Account> GetAccountDetail(int id)
        {
            var accountFromDb = await _db.Accounts.FirstOrDefaultAsync(u => u.Id == id);
            return accountFromDb;
        }

        public async Task<IEnumerable<Account>> GetAll()
        {
            return await _db.Accounts.Include(u => u.Histories).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    }
}