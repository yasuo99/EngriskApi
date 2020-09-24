using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class WordGroup
    {
        public int GroupId { get; set; }
        [ForeignKey("GroupId")]
        public virtual Group Group { get; set; }
        public int WordId { get; set; }
        [ForeignKey("WordId")]
        public virtual Word Word { get; set; }
    }
}