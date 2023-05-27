using DataAccessLayer;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
   public class AdminBusiness : IAdminBusiness
    {
        private readonly IAdminRepository adminRepository; 
        public AdminBusiness()
    {
        this.adminRepository = new AdminRepository();
    }
        public Admin GetAdmin()
        {
            return this.adminRepository.GetAdmin();
        }
    }
   
}
