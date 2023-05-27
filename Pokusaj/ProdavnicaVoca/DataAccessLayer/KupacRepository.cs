using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;


namespace DataAccessLayer
{
    public class KupacRepository : IKupacRepository
    {

        public List<KupacKlasa> GetAllKupac()
        {
            List<KupacKlasa> results = new List<KupacKlasa>();

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = "SELECT * FROM Kupac";

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    KupacKlasa k = new KupacKlasa();
                    k.id = sqlDataReader.GetInt32(0);
                    k.korisnicko_ime = sqlDataReader.GetString(1);
                    k.lozinka = sqlDataReader.GetString(2);
                    k.ime = sqlDataReader.GetString(3);
                    k.prezime = sqlDataReader.GetString(4);
                    k.pol = sqlDataReader.GetString(5);
                    k.id_adresa = sqlDataReader.GetInt32(6);
                    k.broj_telefona = sqlDataReader.GetString(7);
                    k.email = sqlDataReader.GetString(8);

                    results.Add(k);
                }
            }
            return results;
        }

            public KupacKlasa GetKupac(int id)
            {
             KupacKlasa k = new KupacKlasa();

                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = "SELECT * FROM Kupac where id="+id;

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        
                        k.id = sqlDataReader.GetInt32(0);
                        k.korisnicko_ime = sqlDataReader.GetString(1);
                        k.lozinka = sqlDataReader.GetString(2);
                        k.ime = sqlDataReader.GetString(3);
                        k.prezime = sqlDataReader.GetString(4);
                        k.pol = sqlDataReader.GetString(5);
                        k.id_adresa = sqlDataReader.GetInt32(6);
                        k.broj_telefona = sqlDataReader.GetString(7);
                        k.email = sqlDataReader.GetString(8);

                        
                    }
                }
            return k;
                
        }


        public Adresa GetAddress(int id)
        {
            Console.WriteLine("id " + id);
            Adresa v = new Adresa();


            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = "SELECT adresa.grad,adresa.ulica_broj, adresa.postanski_broj, kupac.broj_telefona, adresa.id FROM Kupac JOIN Adresa ON kupac.id_adresa=adresa.id WHERE kupac.id=" + id;

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    v.grad = sqlDataReader.GetString(0);
                    v.ulica_broj = sqlDataReader.GetString(1);
                    v.postanski_broj = sqlDataReader.GetString(2);
                    v.broj_telefona = sqlDataReader.GetString(3);
                    v.id = sqlDataReader.GetInt32(4);
                }
            }
            Console.WriteLine("v.grad "+v.grad);

            return v;
        }

        public int UpdateAddress(Adresa o)
        {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("UPDATE Adresa SET grad='{0}', ulica_broj='{1}', postanski_broj='{2}'  WHERE id={3}",o.grad, o.ulica_broj, o.postanski_broj, o.id );
                    SqlCommand sqlCommand1 = new SqlCommand();
                    sqlCommand1.Connection = sqlConnection;
                    sqlCommand1.CommandText = string.Format("UPDATE Kupac SET broj_telefona='{0}' WHERE id_adresa={1}", o.broj_telefona, o.id);
                    int result2 = sqlCommand1.ExecuteNonQuery();
                    int result = sqlCommand.ExecuteNonQuery();
                
                    return result;

                }
       
       
        } 

        public int InsertKupac(KupacKlasa k)
        {
            Console.WriteLine(k.id_adresa);
            Console.WriteLine(k.korisnicko_ime);

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("INSERT INTO Kupac (korisnicko_ime,lozinka,ime,prezime,pol,id_adresa,broj_telefona,email) VALUES ('{0}', '{1}','{2}','{3}','{4}',{5},'{6}','{7}')", k.korisnicko_ime, k.lozinka,k.ime,k.prezime,k.pol,k.id_adresa,k.broj_telefona, k.email); 
                sqlConnection.Open();

                return sqlCommand.ExecuteNonQuery();
            }

        }

        public int UpdateKupac(KupacKlasa k)
        {
            if (k.lozinka == "0")
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("UPDATE Kupac SET ime='{0}', prezime='{1}', broj_telefona='{2}', email='{3}'  WHERE id={4}", k.ime, k.prezime, k.broj_telefona,k.email, k.id);
                     int result = sqlCommand.ExecuteNonQuery();
                    return result;

                }
            }
            else
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("UPDATE Kupac SET lozinka='{0}' WHERE id={1}", k.lozinka, k.id);
                    int result = sqlCommand.ExecuteNonQuery();
                    return result;

                }
            }
        }

        public int DeleteKupac(int id)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("DELETE from Kupac WHERE id_adresa={0}", id);
                sqlCommand.ExecuteNonQuery();
         
            }
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("DELETE from Adresa WHERE id={0}", id);
               
                int result = sqlCommand.ExecuteNonQuery();
                return result;
            }


        }

        public int InsertAddress(Adresa a)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("INSERT INTO Adresa (grad,ulica_broj,postanski_broj) VALUES ('{0}', '{1}','{2}'); SELECT SCOPE_IDENTITY();", a.grad, a.ulica_broj, a.postanski_broj); 
               
                sqlConnection.Open();

                int res = Convert.ToInt32(sqlCommand.ExecuteScalar());
                return res;
            }

        }
    }
}
