namespace Engrisk.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public string Answer { get; set; }
        public bool IsListeningQuestion { get; set; }
    }
}