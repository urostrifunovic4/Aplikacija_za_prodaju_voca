using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface IKupacBusiness
    {
        List<KupacKlasa> GetAllKupac();
        KupacKlasa GetKupac(int id);
        KupacKlasa GetOneKupac(string user);
        List<KupacKlasa> GetSameUsername(string username);
        string usernameGet(string var);
        bool InsertKupac(KupacKlasa k);
        bool UpdateKupac(KupacKlasa k);
        bool DeleteKupac(int id);
        Adresa GetAddress(int id);
        int InsertAddress(Adresa id);
        bool UpdateAddress(Adresa a);
    }
}
