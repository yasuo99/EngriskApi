using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class AccountRole
    {
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public string RoleId { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }
    }
}