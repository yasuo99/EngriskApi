using System.Collections.Generic;
using Engrisk.Models;

namespace Engrisk.DTOs.Group
{
    public class GroupDetailDTO
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string AccountUsername   {get;set;}
        public string GroupName { get; set; }
        public IEnumerable<WordGroup> Words{ get; set; }
    }
}