using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Role
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public virtual IEnumerable<AccountRole> Accounts { get; set; }
    }
}