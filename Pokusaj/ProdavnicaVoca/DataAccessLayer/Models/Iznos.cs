using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Iznos
    {
        public int id { get; set; }
        public decimal cena { get; set; }
        public int taksa { get; set; }
        public int dostava { get; set; }
        public decimal ukupno { get; set; }
        public int id_kupona { get; set; }
    }
}
