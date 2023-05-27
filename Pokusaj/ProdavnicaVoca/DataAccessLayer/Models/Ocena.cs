using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Ocena
    {
      public  int id { get; set; }
        public string ime { get; set; }
        public string email { get; set; }
        public string opis { get; set; }
        public int broj_zvezdica { get; set; }
        public int id_vocke_vrste{get; set;}
        public DateTime datum { get; set; }
        public string path { get; set; }
        public string string64 { get; set; }
    }
}
