using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class KupacKlasa
    {
        public int id { get; set; }
        public string korisnicko_ime { get; set; }
        public string lozinka { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public string pol { get; set; }
        public int id_adresa { get; set; }
        public string broj_telefona { get; set; }
        public string email { get; set; }

    }
}
