using System;

namespace Engrisk.DTOs.Comment
{
    public class ReplyDTO
    {
        public int Id { get; set; }
        public int ReplyId { get; set; }
        public int AccountId { get; set; }
        public string AccountPhotoUrl { get; set; }
        public string AccountUsername { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
        public int Like { get; set; }
        public int Dislike { get; set; }
        public bool IsEdited { get; set; }
    }
}