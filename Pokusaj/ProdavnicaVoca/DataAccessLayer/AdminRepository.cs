using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class AdminRepository:IAdminRepository
    {
        public Admin GetAdmin()
        {
            Admin k = new Admin();
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = "SELECT * FROM Admin where id=1";

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    
                    k.id = sqlDataReader.GetInt32(0);
                    k.korisnicko_ime = sqlDataReader.GetString(1);
                    k.lozinka = sqlDataReader.GetString(2);
                   
                }
            }

            return k;
        }
    }
}
