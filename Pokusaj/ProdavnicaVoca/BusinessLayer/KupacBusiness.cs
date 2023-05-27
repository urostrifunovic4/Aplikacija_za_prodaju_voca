using DataAccessLayer;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class KupacBusiness:IKupacBusiness
    {
        private readonly IKupacRepository kupacRepository;

        public KupacBusiness()
        {
            this.kupacRepository = new KupacRepository();
        }


        public List<KupacKlasa> GetAllKupac()
        {
            return this.kupacRepository.GetAllKupac();
        }

        public KupacKlasa GetOneKupac(string user)
        {
            List<KupacKlasa> lista = this.kupacRepository.GetAllKupac();
            return lista.Find(kupac => kupac.korisnicko_ime.Equals(user));
        }


         public List<KupacKlasa> GetSameUsername(string username)
         {
             List<KupacKlasa> kupci = this.kupacRepository.GetAllKupac();
             return kupci.FindAll(ka => ka.korisnicko_ime.Equals(username));
         }

        public string usernameGet(string var)
        {
            List<KupacKlasa> kupci = this.kupacRepository.GetAllKupac();
            string vrednost="";
            foreach (KupacKlasa ku in kupci)
                if (ku.korisnicko_ime.Equals(var))
                    vrednost = var;
            return vrednost;
             
                
        }


        public bool InsertKupac(KupacKlasa k)
        {
            if (this.kupacRepository.InsertKupac(k) > 0)
                return true;
            else 
                return false;

          
        }


        public bool UpdateKupac(KupacKlasa k)
        {
            if (this.kupacRepository.UpdateKupac(k) > 0)
                return true;
            else
                return false;

        }

        public Adresa GetAddress(int id)
        {
            return this.kupacRepository.GetAddress(id);
        }

        public bool UpdateAddress(Adresa a)
        {
            if (this.kupacRepository.UpdateAddress(a) > 0)
                return true;
            else
                return false;

        }

        public bool DeleteKupac(int id)
        {
            if (this.kupacRepository.DeleteKupac(id) > 0)
                return true;
            else
                return false;
        }

        public KupacKlasa GetKupac(int id)
        {
            return this.kupacRepository.GetKupac(id);
        }

        public int InsertAddress(Adresa id)
        {
            return this.kupacRepository.InsertAddress(id);
        }
    }
}
