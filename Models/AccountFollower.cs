using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class AccountFollower
    {
        public int FollowerId { get; set; }
        [ForeignKey("FollowerId")]
        public virtual Account Account { get; set; }
        public int MyProperty { get; set; }
    }
}