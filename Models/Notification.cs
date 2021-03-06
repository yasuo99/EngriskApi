using System;
using System.Collections.Generic;

namespace Engrisk.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Url { get; set; }
        public DateTime PublishedDate { get; set; }
        public bool IsPublish { get; set; }
        public string Type { get; set; }
        public bool IsClientNotify { get; set; }
     }
}