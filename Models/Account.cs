using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public bool IsVerified { get; set; }
        public string Username { get; set; }       
        public byte[] PasswordHashed { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Fullname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int Exp { get; set; }
        public int Point { get; set; }
        public DateTime Locked { get; set; }
        public bool  IsDisabled { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public virtual IEnumerable<AccountBadge> AccountBadges { get; set; }
        public virtual IEnumerable<Group> Groups { get; set; }
        public virtual IEnumerable<AccountRole> Roles { get; set; }
        public virtual IEnumerable<History> Histories { get; set; }
        public virtual IEnumerable<AccountMission> Missions { get; set; }
    }
}