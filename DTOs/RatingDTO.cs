namespace Engrisk.DTOs
{
    public class RatingDTO
    {
        public int Id { get; set; }
        public int AccountId  { get; set; }
        public string AccountUsername { get; set; }
        public int Rating { get; set; }
    }
}