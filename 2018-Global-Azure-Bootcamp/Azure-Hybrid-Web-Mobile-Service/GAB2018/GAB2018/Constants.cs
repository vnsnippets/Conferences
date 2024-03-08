using System;
using System.Collections.Generic;
using System.Text;

namespace GAB2018
{
    public class Constants
    {
        public struct Pages
        {
            public const string Login = nameof(Login);
            public const string Agenda = nameof(Agenda);
            public const string Speaker = nameof(Speaker);
        }

        public struct Keys
        {
            public const string Speaker = "DATA_SPEAKER";
        }

        public const string MobileServiceURL = "http://gabmauritius.azurewebsites.net";
        public static readonly string SQLiteStore = "GAB2018.db";
    }
}
