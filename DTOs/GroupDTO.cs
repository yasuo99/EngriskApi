using System.Collections.Generic;
using Engrisk.Models;

namespace Engrisk.DTOs
{
    public class GroupDTO
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string AccountUsername   {get;set;}
        public virtual AccountDetailDTO Account { get; set; }
        public string GroupName { get; set; }
        public virtual IEnumerable<WordGroup> Words { get; set; }
    }
}