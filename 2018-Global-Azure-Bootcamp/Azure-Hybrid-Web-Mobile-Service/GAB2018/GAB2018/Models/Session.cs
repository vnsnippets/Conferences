using GAB2018.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace GAB2018.Models
{
    public class Session : EntityData
    {
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }

        public string SpeakerId { get; set; }
    }
}
