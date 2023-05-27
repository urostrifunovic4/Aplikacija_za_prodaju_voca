using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Admin
    {
        public int id { get; set; }
        public string korisnicko_ime { get; set; }
        public string lozinka { get; set; }
    }
}
