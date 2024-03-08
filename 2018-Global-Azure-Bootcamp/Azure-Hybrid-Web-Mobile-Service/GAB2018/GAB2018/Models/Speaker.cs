using GAB2018.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace GAB2018.Models
{
    public class Speaker : EntityData
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string Biography { get; set; }
        public string Blog { get; set; }
        public string Twitter { get; set; }
    }
}
