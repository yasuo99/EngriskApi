using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Engrisk.Models
{
    public class Account : IdentityUser<int>
    {
        public string Fullname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public int Exp { get; set; }
        public int Point { get; set; }
        public DateTime Locked { get; set; }
        public bool IsDisabled { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        /// <summary>DoWork is a method in the TestClass class.
        /// <para>Here's how you could make a second paragraph in a description. <see cref="System.Console.WriteLine(System.String)"/> for information about output statements.</para>
        /// </summary>
        public bool Streak { get; set; }
        public virtual IEnumerable<AccountBadge> AccountBadges { get; set; }
        public virtual IEnumerable<AccountSection> Sections { get; set; }
        public virtual IEnumerable<Group> Groups { get; set; }
        public virtual IEnumerable<AccountRole> Roles { get; set; }
        public virtual IEnumerable<History> Histories { get; set; }
        public virtual IEnumerable<ExamHistory> ExamHistories { get; set; }
        public virtual IEnumerable<TopupHistory> TopupHistories { get; set; }
        public virtual IEnumerable<AccountMission> Missions { get; set; }
        public virtual IEnumerable<AccountStorage> Storage { get; set; }
        public virtual IEnumerable<AccountAttendance> Attendences { get; set; }
        public virtual IEnumerable<Post> Posts { get; set; }
        public virtual IEnumerable<Comment> Comments { get; set; }
        public virtual IEnumerable<PostRating> PostRatings { get; set; }
        public virtual IEnumerable<LikedPost> LikedPosts { get; set; }
        public virtual IEnumerable<LikedComment> LikedComments { get; set; }
        public virtual IEnumerable<WordLearnt> Learned { get; set; }
        public virtual List<AccountOTP> AccountOTP { get; set; }
        ///<summary>
        ///<para>Danh sách refresh token</para>
        ///</summary>
        [JsonIgnore]
        public virtual List<RefreshToken> RefreshTokens { get; set; }
    }
}