using System.ComponentModel.DataAnnotations.Schema;

namespace Engrisk.Models
{
    public class WordExample
    {
        public int WordId { get; set; }
        [ForeignKey("WordId")]
        public virtual Word Word { get; set; }
        public int ExampleId { get; set; }
        [ForeignKey("ExampleId")]
        public virtual Example Example{ get; set; }
    }
}