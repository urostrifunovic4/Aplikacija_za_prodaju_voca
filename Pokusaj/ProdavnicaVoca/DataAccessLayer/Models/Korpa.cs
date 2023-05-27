using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Korpa
    {
        public int id { get; set; }
        public string naziv { get; set; }
        public int kolicina { get; set; }
        public decimal cena { get; set; }
        public string path { get; set; }
        public string string64 { get; set; }
        public int id_vocka_vrsta { get; set; }
        public int? id_kupca { get; set; }
        public int dodata_kolicina { get; set; }
        public int? id_iznosa { get; set; }
        public int? id_narudzbine { get; set; }

    }
}
