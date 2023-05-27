using DataAccessLayer;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class VockaVrstaBusiness:IVockaVrstaBusiness
    {
        private readonly IVockaVrstaRepository vockaVrstaRepository;
        public string getnesto(string getal)
        {
          return this.vockaVrstaRepository.getnesto(getal);
        }
        public Vocka_Vrsta GetOneVockaVrsta(int id) { 
            List<Vocka_Vrsta> lista = this.vockaVrstaRepository.GetAllVoce(); 
            return lista.Find(kupac => kupac.id == id);
        }
        public VockaVrstaBusiness()
        {
            this.vockaVrstaRepository = new VockaVrstaRepository();
        }

        public List<Vocka_Vrsta> GetAllVockaVrsta()
        {
            return this.vockaVrstaRepository.GetAllVoce();
        }


        public int InsertVockaVrsta(Vocka_Vrsta v)
        {
            return this.vockaVrstaRepository.InsertVoce(v);

        }

        public bool UpdateVockaVrsta(Vocka_Vrsta v)
        {
            if (this.vockaVrstaRepository.UpdateVoce(v) > 0)
                return true;
            else
                return false;

        }
        public bool DeleteVockaVrsta(int id)
        {
            if (this.vockaVrstaRepository.DeleteVoce(id) > 0)
                return true;
            else
                return false;

        }
        public List<Ocena> GetOcena(int id)
        {
            return this.vockaVrstaRepository.GetOcena(id);
        }

        public bool InsertOcena(Ocena o)
        {
            if (this.vockaVrstaRepository.InsertOcena(o) > 0)
                return true;
            else
                return false;
        }
        public List<Vocka_Vrsta> GetVockaVrsta(string query)
        {
            return this.vockaVrstaRepository.GetVockaVrsta(query);
        }

        public List<Ocena> GetOcene()
        {
            return this.vockaVrstaRepository.GetOcene();
        }

        public bool UpdateVockaVrstaPath(string v, int id)
        {
            if (this.vockaVrstaRepository.UpdateVocePath(v,id) > 0)
                return true;
            else
                return false;
        }
    }
}
