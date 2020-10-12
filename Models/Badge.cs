using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Badge
    {
        public int Id { get; set; }
        public string BadgeLogo { get; set; }
        public virtual IEnumerable<AccountBadge> Accounts { get; set; }
    }
}