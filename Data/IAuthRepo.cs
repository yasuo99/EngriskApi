using System.Collections.Generic;
using System.Threading.Tasks;
using Engrisk.DTOs;
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
        Task<AuthenticateRequestDTO> GenerateToken(Account account, string ipAddress);
        RefreshToken GenerateRefreshToken(string ipAddress);
        Task<bool> RevokeToken(string token, string ipAddress);
        Task<AuthenticateRequestDTO> RefreshToken(string token, string ipAddress);
        bool Exists(string identify);
    }
}