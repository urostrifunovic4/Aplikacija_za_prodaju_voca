using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public interface IListaZeljaRepository
    {
        List<ListaZelja> GetListaZelja(int id);

        int DeleteListaZelja(int id);
        int DeleteListaZeljaId(int id);

        int InsertListaZelja(ListaZelja k);

        int UpdateListaZelja(ListaZelja k);

    }
}
