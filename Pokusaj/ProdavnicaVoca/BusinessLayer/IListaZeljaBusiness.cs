using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
   public interface IListaZeljaBusiness
    {
        List<ListaZelja> GetListaZelja(int id);

        bool DeleteListaZelja(int id);
        bool DeleteListaZeljaId(int id);

        bool InsertListaZelja(ListaZelja k);

        bool UpdateListaZelja(ListaZelja k);


    }
}
