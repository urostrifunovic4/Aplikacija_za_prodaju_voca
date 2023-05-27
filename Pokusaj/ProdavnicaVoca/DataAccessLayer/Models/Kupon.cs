using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
   public class Kupon
    {
        public int id { get; set; }
        public string naziv { get; set; }
        public int procenat { get; set; }
        public DateTime datum_isteka { get; set; }
    }
}
