using DataAccessLayer;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class VockaBusiness:IVockaBusiness
    {
        private readonly IVockaRepository vockaRepository;

        public VockaBusiness()
        {
            this.vockaRepository = new VockaRepository();
        }

        public List<Vocka> GetAllVocka()
        {
            return this.vockaRepository.GetAllVoce();
        }

        public string GetNaziv(int id)
        {
            string naziv = "";
            foreach (Vocka v in GetAllVocka())
            {
                if (v.id == id)
                {
                    naziv = v.naziv;
                }
            }
            return naziv;
        }


        public bool InsertVockaVrsta(Vocka v)
        {
            if (this.vockaRepository.InsertVoce(v) > 0)
                return true;
            else
                return false;

        }

        public bool UpdateVockaVrsta(Vocka v)
        {
            if (this.vockaRepository.UpdateVoce(v) > 0)
                return true;
            else
                return false;

        }

        public bool DeleteVockaVrsta(int id)
        {
            if (this.vockaRepository.DeleteVoce(id) > 0)
                return true;
            else
                return false;

        }







    }
}
