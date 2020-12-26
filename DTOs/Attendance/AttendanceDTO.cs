using System;
using Engrisk.Models;

namespace Engrisk.DTOs
{
    public class AttendanceDTO
    {
        public DateTime Date { get; set; }
        public string Type {get;set;}
        public int Value { get; set; }
        public bool IsTookAttendance { get; set; }
    }
}