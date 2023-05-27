using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public interface IVockaRepository
    {
        List<Vocka> GetAllVoce();

        int DeleteVoce(int id);

        int InsertVoce(Vocka v);

        int UpdateVoce(Vocka v);




    }
}
