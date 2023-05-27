using DataAccessLayer;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
   public class ListaZeljaBusiness:IListaZeljaBusiness
    {
        private readonly IListaZeljaRepository listaZeljaRepository;
        public ListaZeljaBusiness()
        {
            this.listaZeljaRepository = new ListaZeljaRepository();
        }
        public List<ListaZelja> GetListaZelja(int id)
        {
            return this.listaZeljaRepository.GetListaZelja(id);
        }

        public bool DeleteListaZelja(int id)
        {
            if (this.listaZeljaRepository.DeleteListaZelja(id) > 0)
                return true;
            else
                return false;
        }

        public bool DeleteListaZeljaId(int id)
        {
            if (this.listaZeljaRepository.DeleteListaZeljaId(id) > 0)
                return true;
            else
                return false;
        }

        public bool InsertListaZelja(ListaZelja k)
        {
            if (this.listaZeljaRepository.InsertListaZelja(k) > 0)
                return true;
            else
                return false;
        }

        public bool UpdateListaZelja(ListaZelja k)
        {
            if (this.listaZeljaRepository.UpdateListaZelja(k) > 0)
                return true;
            else
                return false;
        }
    }
}
