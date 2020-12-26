using System.ComponentModel.DataAnnotations;

namespace Engrisk.DTOs
{
    public class ResetPasswordDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public int OTP { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        public string ConfirmPassword { get; set; }
    }
}