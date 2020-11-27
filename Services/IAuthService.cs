using System.Threading.Tasks;
using Engrisk.Models;

namespace Engrisk.Services
{
    public interface IAuthService
    {
         Task<Account> Authenticate(UserLoginRequest request);
         Task<Account> GetOrCreateExternalLoginUser(string provider, string key, string email, string fullname, string picture);
    }
}