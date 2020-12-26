using System.ComponentModel.DataAnnotations;

namespace Engrisk.DTOs.Account
{
    public class VerifyEmailDTO
    {
        [Required]
        public int OTP { get; set; }
        [Required]
        public string Email { get; set; }
    }
}