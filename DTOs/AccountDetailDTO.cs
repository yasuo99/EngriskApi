using System;
using System.Collections.Generic;
using Engrisk.Models;

namespace Engrisk.DTOs
{
    public class AccountDetailDTO
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public string Email { get; set; }
        public bool IsVerified { get; set; }
        public string Username { get; set; }
        public string Fullname { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public virtual Level Level { get; set; }
        public string LevelName { get; set; }
        public int Exp { get; set; }
        public int Point { get; set; }
        public DateTime Locked { get; set; }
        public bool  IsDisabled { get; set; }
        public virtual IEnumerable<Group> Groups { get; set; }
        public virtual IEnumerable<AccountRole> Roles { get; set; }
        public virtual IEnumerable<History> Histories { get; set; }
        public virtual IEnumerable<AccountMission> Missions { get; set; }
    }
}