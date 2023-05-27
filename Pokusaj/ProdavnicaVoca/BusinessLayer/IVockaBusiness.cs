using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface IVockaBusiness
    {
        List<Vocka> GetAllVocka();
        string GetNaziv(int id);
        bool InsertVockaVrsta(Vocka v);
        bool UpdateVockaVrsta(Vocka v);
        bool DeleteVockaVrsta(int id);

    }
}
