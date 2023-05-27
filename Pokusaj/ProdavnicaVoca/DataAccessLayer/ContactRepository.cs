using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class ContactRepository:IContactRepository
    {
        public List<Contact> GetAllContact()
        {
            List<Contact> results = new List<Contact>();

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = "SELECT * FROM Contact";

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    Contact c = new Contact();
                    c.id = sqlDataReader.GetInt32(0);
                    c.name = sqlDataReader.GetString(1);
                    c.mail = sqlDataReader.GetString(2);
                    c.company = sqlDataReader.GetString(3);
                    c.contact_number = sqlDataReader.GetString(4);
                    c.message = sqlDataReader.GetString(5);

                    results.Add(c);
                }
            }

            return results;
        }


        public int InsertContact(Contact c)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("INSERT INTO Contact VALUES ('{0}','{1}','{2}','{3}','{4}')", c.name, c.mail,c.company,c.contact_number,c.message);
               
                sqlConnection.Open();

                return sqlCommand.ExecuteNonQuery();
            }

        }





    }
}
