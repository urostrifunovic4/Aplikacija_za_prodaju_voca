using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public interface IVockaVrstaRepository
    {
        
        string getnesto(string getal);
        List<Vocka_Vrsta> GetAllVoce();
        List<Vocka_Vrsta> GetVockaVrsta(string query);
        int InsertVoce(Vocka_Vrsta v);
        int UpdateVoce(Vocka_Vrsta v);
        int UpdateVocePath(string v,int id);
        int DeleteVoce(int id);
        List<Ocena> GetOcena(int id);
        List<Ocena> GetOcene();
        int InsertOcena(Ocena o);

    }
}
