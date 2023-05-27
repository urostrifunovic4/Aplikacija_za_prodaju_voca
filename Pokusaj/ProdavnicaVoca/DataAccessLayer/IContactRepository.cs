using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public interface IContactRepository
    {
        List<Contact> GetAllContact();
        int InsertContact(Contact c);
    }
}
