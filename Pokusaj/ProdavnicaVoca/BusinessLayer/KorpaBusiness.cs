using DataAccessLayer;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
   public class KorpaBusiness:IKorpaBusiness
    {
        private readonly IKorpaRepository korpaRepository;
        public KorpaBusiness()
        {
            this.korpaRepository = new KorpaRepository();
        }
        public List<Korpa> GetAllKorpa(int id)
        {
            return this.korpaRepository.GetAllKorpa(id);
        }

        public bool DeleteKorpa(int id)
        {
            if (this.korpaRepository.DeleteKorpa(id) > 0)
                return true;
            else
                return false;
        }

        public bool InsertKorpa(Korpa k)
        {
            if (this.korpaRepository.InsertKorpa(k) > 0)
                return true;
            else
                return false;
        }

        public bool UpdateKorpa(Korpa k)
        {
            if (this.korpaRepository.UpdateKorpa(k) > 0)
                return true;
            else
                return false;
        }

        public List<Narudzbina> GetAllNarudzbina(int id)
        {
            return this.korpaRepository.GetAllNarudzbina(id);
        }

        public bool DeleteNarudzbina(int id)
        {
            if (this.korpaRepository.DeleteNarudzbina(id) > 0)
                return true;
            else
                return false;
        }

        public int InsertNarudzbina(Narudzbina n)
        {
            return this.korpaRepository.InsertNarudzbina(n);
               
        }

        public bool UpdateNarudzbina(Narudzbina n)
        {
            if (this.korpaRepository.UpdateNarudzbina(n) > 0)
                return true;
            else
                return false;
        }

        public bool DeleteKorpaId(int id)
        {
            if (this.korpaRepository.DeleteKorpaId(id) > 0)
                return true;
            else
                return false;
        }

        public List<Kupon> GetKuponi()
        {
            return this.korpaRepository.GetKuponi();
        }

        public bool InsertKupon(Kupon o)
        {
            if (this.korpaRepository.InsertKupon(o) > 0)
                return true;
            else
                return false;
        }

        public int InsertIznos(Iznos i)
        {
            return this.korpaRepository.InsertIznos(i);
        }

        public Iznos GetIznos(int id)
        {
            return this.korpaRepository.GetIznos(id);
        }
        public bool UpdateIznos(Iznos i)
        {
            if (this.korpaRepository.UpdateIznos(i) > 0)
                return true;
            else
                return false;
        }

        public bool UpdateKorpaKolicina(Korpa k)
        {
            if (this.korpaRepository.UpdateKorpaKolicina(k) > 0)
                return true;
            else
                return false;
        }

        public bool UpdateIznosKupon(Iznos i)
        {
            if (this.korpaRepository.UpdateIznosKupon(i) > 0)
                return true;
            else
                return false;
        }

        public bool DeleteIznos(int id)
        {
            if (this.korpaRepository.DeleteIznos(id) > 0)
                return true;
            else
                return false;
        }

        public bool UpdateKorpaidKupca(Korpa k)
        {
            if (this.korpaRepository.UpdateKorpaIdKupca(k) > 0)
                return true;
            else
                return false;
        }

        public bool UpdateKorpaNarudzbina(Korpa k)
        {
            if (this.korpaRepository.UpdateKorpaNarudzbina(k) > 0)
                return true;
            else
                return false;
        }
    }
}
