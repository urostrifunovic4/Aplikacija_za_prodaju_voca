using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface IVockaVrstaBusiness
    {
        
        string getnesto(string getal);
        Vocka_Vrsta GetOneVockaVrsta(int id);
        List<Vocka_Vrsta> GetVockaVrsta(string query);
        List<Vocka_Vrsta> GetAllVockaVrsta();
        int InsertVockaVrsta(Vocka_Vrsta v);
        bool UpdateVockaVrsta(Vocka_Vrsta v);
        bool UpdateVockaVrstaPath(string v,int id);
        bool DeleteVockaVrsta(int id);
        List<Ocena> GetOcena(int id);
        List<Ocena> GetOcene();
        bool InsertOcena(Ocena o);
     
    }
}
