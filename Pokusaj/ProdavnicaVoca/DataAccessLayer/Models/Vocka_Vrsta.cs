using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Vocka_Vrsta
    {
        public int id { get; set; }
        public string naziv { get; set; }
        public int kolicina { get; set; }
        public decimal cena { get; set; }
        public int id_vocke { get; set; }
        public string path { get; set; }
        public string string64 { get; set; }

    }
}
