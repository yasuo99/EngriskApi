namespace Engrisk.DTOs.Section
{
    public class SectionDetailDTO
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string SectionName { get; set; }
        public bool RequireLogin { get; set; }
        public int DPA { get; set; }
    }
}