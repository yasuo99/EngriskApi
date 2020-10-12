using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Engrisk.Models
{
    public class Role: IdentityRole<int>
    {
        public virtual IEnumerable<AccountRole> Accounts { get; set; }
    }
}