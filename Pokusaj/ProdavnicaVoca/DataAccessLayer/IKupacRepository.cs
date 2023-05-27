using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public interface IKupacRepository
    {
         List<KupacKlasa> GetAllKupac();
        KupacKlasa GetKupac(int id);
        int InsertKupac(KupacKlasa k);
        int InsertAddress(Adresa a);
        int UpdateKupac(KupacKlasa k);
        int DeleteKupac(int id);

        Adresa GetAddress(int id);
        int UpdateAddress(Adresa a);

    }
}
