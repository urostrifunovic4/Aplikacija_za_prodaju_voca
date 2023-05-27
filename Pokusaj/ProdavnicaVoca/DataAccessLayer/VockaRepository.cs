using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class VockaRepository:IVockaRepository
    {

        public List<Vocka> GetAllVoce()
        {
            List<Vocka> results = new List<Vocka>();

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = "SELECT * FROM Vocka";

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    Vocka v = new Vocka();
                    v.id = sqlDataReader.GetInt32(0);
                    v.naziv = sqlDataReader.GetString(1);

                    results.Add(v);
                }
            }

            return results;
        }


        public int DeleteVoce(int id)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("DELETE FROM Vocka WHERE id={0}", id);
                int result = sqlCommand.ExecuteNonQuery();
                return result;

            }
        }


        public int InsertVoce(Vocka v)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format($"INSERT INTO Vocka(naziv" +
                $") VALUES('{v.naziv}')");
                sqlConnection.Open();

                return sqlCommand.ExecuteNonQuery();
            }

        }


        public int UpdateVoce(Vocka v)
        {
            Console.WriteLine("v.id" + v.id);
            Console.WriteLine("v.naziv" + v.naziv);

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("UPDATE Vocka SET naziv='{0}' WHERE id={1}", v.naziv, v.id);
                int result = sqlCommand.ExecuteNonQuery();
                return result;

            }
        }

    }
}
