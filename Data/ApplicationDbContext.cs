using Engrisk.Models;
using Microsoft.EntityFrameworkCore;

namespace Engrisk.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Example> Examples { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Word> Word { get; set; }
        public DbSet<Quiz> Quiz { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<AccountBadge> AccountBadges { get; set; }
        public DbSet<AccountMission> AccoountMissions { get; set; }
        public DbSet<AccountRole> AccountRoles { get; set; }
        public DbSet<Mission> Missions { get; set; }
        public DbSet<Badge> Badges { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<WordGroup> WordGroups { get; set; }
        public DbSet<History> Histories { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AccountBadge>().HasKey(key => new {key.AccountId,key.BadgeId});
            builder.Entity<AccountBadge>().HasOne(o => o.Account)
                                        .WithMany(m => m.AccountBadges)
                                        .HasForeignKey(key => key.AccountId)
                                        .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<QuizQuestion>().HasKey(key => new {key.QuizId,key.QuestionId});
            builder.Entity<AccountRole>().HasKey(key => new {key.AccountId, key.RoleId});
            builder.Entity<AccountMission>().HasKey(key => new {key.AccountId, key.MissionId});
        }

    }
}