using Engrisk.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Engrisk.Data
{
    public class ApplicationDbContext : IdentityDbContext<Account, Role, int, IdentityUserClaim<int>,
    AccountRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Example> Examples { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Word> Word { get; set; }
        public DbSet<ReportError> ReportErrors { get; set; }
        public DbSet<Quiz> Quiz { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<Group> Groups { get; set; }    
        public DbSet<DailyMission> DailyMissions { get; set; }
        public DbSet<Badge> Badges { get; set; }
        public DbSet<History> Histories { get; set; }
        public DbSet<WordGroup> WordGroups { get; set; }
        public DbSet<WordExample> WordExamples { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<AccountBadge> AccountBadges { get; set; }
        public DbSet<AccountMission> AccountMissions { get; set; }
        public DbSet<AccountRole> AccountRoles { get; set; }
        public DbSet<AccountAttendance> AccountAttendances { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Account>().HasIndex(acc => acc.Email).IsUnique();
            builder.Entity<Account>().HasIndex(acc => acc.UserName).IsUnique();
            builder.Entity<Account>().HasIndex(acc => acc.PhoneNumber).IsUnique();
            builder.Entity<AccountRole>(role => {
                role.HasKey(key => new {key.UserId, key.RoleId});
                role.HasOne(o => o.Account)
                    .WithMany(m => m.Roles)
                    .HasForeignKey(key => key.UserId)
                    .IsRequired();
                role.HasOne(o => o.Role)
                    .WithMany(m => m.Accounts)
                    .HasForeignKey(key => key.RoleId)
                    .IsRequired();
            });
            builder.Entity<AccountBadge>().HasKey(key => new { key.AccountId, key.BadgeId });
            builder.Entity<AccountBadge>().HasOne(o => o.Account)
                                        .WithMany(m => m.AccountBadges)
                                        .HasForeignKey(key => key.AccountId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<AccountBadge>().HasOne(o => o.Badge)
                                        .WithMany(m => m.Accounts)
                                        .HasForeignKey(key => key.BadgeId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<QuizQuestion>().HasKey(key => new { key.QuizId, key.QuestionId });
            builder.Entity<QuizQuestion>().HasOne(o => o.Question)
                                        .WithMany(m => m.Quizes)
                                        .HasForeignKey(key => key.QuestionId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<QuizQuestion>().HasOne(o => o.Quiz)
                                        .WithMany(m => m.Questions)
                                        .HasForeignKey(key => key.QuizId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<AccountMission>().HasKey(key => new { key.AccountId, key.DailyMissionId });
            builder.Entity<AccountMission>().HasOne(o => o.Account)
                                        .WithMany(m => m.Missions)
                                        .HasForeignKey(key => key.AccountId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<AccountMission>().HasOne(o => o.DailyMission)
                                        .WithMany(m => m.Acccounts)
                                        .HasForeignKey(key => key.DailyMissionId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<WordExample>().HasKey(key => new { key.WordId, key.ExampleId });
            builder.Entity<WordExample>().HasOne(o => o.Word)
                                        .WithMany(m => m.Examples)
                                        .HasForeignKey(key => key.WordId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<WordExample>().HasOne(o => o.Example)
                                        .WithMany(m => m.Words)
                                        .HasForeignKey(key => key.ExampleId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<WordGroup>().HasKey(key => new { key.GroupId, key.WordId });
            builder.Entity<WordGroup>().HasOne(o => o.Group)
                                        .WithMany(m => m.Words)
                                        .HasForeignKey(key => key.GroupId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<WordGroup>().HasOne(o => o.Word)
                                        .WithMany(m => m.Groups)
                                        .HasForeignKey(key => key.WordId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<AccountStorage>().HasKey(key => new {key.AccountId, key.ItemId});
            builder.Entity<AccountStorage>().HasOne(o => o.Account)
                                        .WithMany(m => m.Storage)
                                        .HasForeignKey(key => key.AccountId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<AccountStorage>().HasOne(o => o.Item)
                                        .WithMany(m => m.Accounts)
                                        .HasForeignKey(key => key.ItemId)  
                                        .OnDelete(DeleteBehavior.Restrict);                    
        }

    }
}
