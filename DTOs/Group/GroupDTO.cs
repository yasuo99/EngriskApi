using System.Collections.Generic;
using Engrisk.DTOs.Word;
using Engrisk.Models;

namespace Engrisk.DTOs
{
    public class GroupDTO
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string AccountUsername   {get;set;}
        public string GroupName { get; set; }
        public IEnumerable<WordDTO> Words { get; set; }
    }
}