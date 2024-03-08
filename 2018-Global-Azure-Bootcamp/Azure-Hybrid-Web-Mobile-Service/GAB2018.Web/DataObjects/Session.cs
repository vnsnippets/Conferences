using Microsoft.Azure.Mobile.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GAB2018.Web.DataObjects
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