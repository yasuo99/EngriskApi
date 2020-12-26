using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Section
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public string SectionName { get; set; }
        public string Description { get; set; }
        public bool RequireLogin { get; set; }
        public virtual IEnumerable<Quiz> Quizzes { get; set; }
        public virtual IEnumerable<AccountSection> Accounts { get; set; }
    }
}