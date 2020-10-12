using System.Collections.Generic;
using System.Threading.Tasks;
using Engrisk.Helper;
using Engrisk.Models;

namespace Engrisk.Data
{
    public interface IAuthRepo
    {
        Task<PagingList<Account>> GetAll(SubjectParams subjectParams);
        Task<Account> GetAccountDetail(string identify);
        Task<Account> GetAccountDetail(int id);
        Task<Account> CreateAccount(Account account);
        Task DeleteAccount(int id);
        Task DeleteAccount(string username);
        Task<bool> SaveAll();
        bool Exists(string identify);
    }
}