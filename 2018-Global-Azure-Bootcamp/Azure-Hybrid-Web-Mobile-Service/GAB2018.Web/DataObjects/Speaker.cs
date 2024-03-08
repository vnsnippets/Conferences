using Microsoft.Azure.Mobile.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GAB2018.Web.DataObjects
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