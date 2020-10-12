using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int Value {get;set;}
        public virtual IEnumerable<AccountAttendance> Accounts { get; set; }
    }
}