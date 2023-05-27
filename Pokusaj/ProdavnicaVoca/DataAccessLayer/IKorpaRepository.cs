using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
  public  interface IKorpaRepository
    {

        List<Kupon> GetKuponi();
        int InsertKupon(Kupon o);
        int UpdateIznos(Iznos i);
        int UpdateIznosKupon(Iznos i);
        int DeleteIznos(int id);
        Iznos GetIznos(int id);

        int InsertIznos(Iznos i);
        List<Korpa> GetAllKorpa(int id);

        int DeleteKorpa(int id);
        int DeleteKorpaId(int id);

        int InsertKorpa(Korpa k);

        int UpdateKorpa(Korpa k);
        int UpdateKorpaKolicina(Korpa k);
        int UpdateKorpaIdKupca(Korpa k);
        List<Narudzbina> GetAllNarudzbina(int id);

        int DeleteNarudzbina(int id);

        int InsertNarudzbina(Narudzbina n);
        int UpdateKorpaNarudzbina(Korpa k);
        int UpdateNarudzbina(Narudzbina n);
    }
}
