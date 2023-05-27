using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
   public interface IKorpaBusiness
    {
        List<Kupon> GetKuponi();
        bool InsertKupon(Kupon o);

        Iznos GetIznos(int id);
        int InsertIznos(Iznos i);
        bool UpdateIznos(Iznos i); 
        bool DeleteIznos(int id);
        bool UpdateIznosKupon(Iznos i);
        List<Korpa> GetAllKorpa(int id);
        bool DeleteKorpa(int id);
        bool DeleteKorpaId(int id);
        bool UpdateKorpaNarudzbina(Korpa k);
        bool InsertKorpa(Korpa k);
        bool UpdateKorpa(Korpa k);
        bool UpdateKorpaKolicina(Korpa k);
        bool UpdateKorpaidKupca(Korpa k);
        List<Narudzbina> GetAllNarudzbina(int id);
        bool DeleteNarudzbina(int id);
        int InsertNarudzbina(Narudzbina n);
        bool UpdateNarudzbina(Narudzbina n);
    }
}
