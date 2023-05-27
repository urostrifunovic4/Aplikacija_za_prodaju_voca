using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Narudzbina
    {
        public int id { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public string email { get; set; }
        public string adresa { get; set; } 
        public string grad { get; set; } 
        public string postanski_broj { get; set; }
        public string broj_telefona { get; set; }
        public decimal ukupnaCena { get; set; }
        public int? id_kupca { get; set; }
        public string status { get; set; }
        public DateTime datum { get; set; }
    }
}
