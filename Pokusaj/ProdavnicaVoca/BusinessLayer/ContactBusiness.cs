using DataAccessLayer;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class ContactBusiness:IContactBusiness
    {
        private readonly IContactRepository contactRepository;

        public ContactBusiness()
        {
            this.contactRepository = new ContactRepository();
        }

        public List<Contact> GetAllContact()
        {
            return this.contactRepository.GetAllContact();
        }

        public bool InsertContact(Contact c)
        {
            if (this.contactRepository.InsertContact(c) > 0)
                return true;
            else
                return false;

        }
    }
}
