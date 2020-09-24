using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class AccountMission
    {
        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
        public int MissionId { get; set; }
        [ForeignKey("MissionId")]
        public virtual Mission Mission { get; set; }
        public double DonePercent { get; set; }
        public bool IsDone { get; set; }    
    }
}