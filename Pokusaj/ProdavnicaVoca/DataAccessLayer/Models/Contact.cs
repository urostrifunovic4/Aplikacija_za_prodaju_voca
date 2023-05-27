using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Contact
    {
        public int id { get; set; }
        public string name { get; set; }
        public string mail { get; set; }
        public string company { get; set; }
        public string contact_number { get; set; }
        public string message { get; set; }
    }
}
