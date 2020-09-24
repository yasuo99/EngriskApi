using System.Collections.Generic;
using System.Threading.Tasks;
using Engrisk.Models;

namespace Engrisk.Data
{
    public interface IAuthRepo
    {
        Task<IEnumerable<Account>> GetAll();
        Task<Account> GetAccountDetail(string identify);
        Task<Account> GetAccountDetail(int id);
        Task<Account> CreateAccount(Account account);
        void DeleteAccount(int id);
        void DeleteAccount(string username);
        Task<bool> SaveAll();
        bool Exists(string identify);
    }
}