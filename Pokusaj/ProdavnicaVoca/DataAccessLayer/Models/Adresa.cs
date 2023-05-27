using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
  public  class Adresa
    {
        public int id { get; set; }
        public string grad { get; set; }
        public string ulica_broj { get; set; }
        public string postanski_broj { get; set; }
        public string broj_telefona { get; set; }
    }
}
