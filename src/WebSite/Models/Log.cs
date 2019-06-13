using System;
using System.ComponentModel.DataAnnotations;

namespace WebSite.Models
{
    public class Log
    {
        public int Id { get; set; }
        
        public Status Status { get; set; }

        public int RaspberryId { get; set; }
        
        public string AdditionalData { get; set; }
        
        public DateTime CreatedDate { get; set; }

        public Raspberry Raspberry { get; set; }

        public Log()
        {
            CreatedDate = DateTime.Now;
        }
    }
}
