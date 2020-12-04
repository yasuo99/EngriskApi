using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Engrisk.Models;
using Newtonsoft.Json;

namespace Engrisk.DTOs
{
    public class PostDTO
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string AccountUserName { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public int TotalComment { get; set; }
        public double Rating { get; set; }
    }
}