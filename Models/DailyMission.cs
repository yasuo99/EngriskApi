using System;
using System.Collections.Generic;

namespace Engrisk.Models
{
    public class DailyMission
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Instruction { get; set; }
        public int MaxProcess { get; set; }
        public int ExpGain { get; set; }
        public virtual IEnumerable<AccountMission> Acccounts { get; set; }
    }
}