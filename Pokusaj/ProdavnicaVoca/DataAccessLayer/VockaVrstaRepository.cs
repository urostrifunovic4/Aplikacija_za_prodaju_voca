using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace DataAccessLayer
{
    public class VockaVrstaRepository : IVockaVrstaRepository
    {
        public List<Vocka_Vrsta> GetAllVoce()
        {
            List<Vocka_Vrsta> results = new List<Vocka_Vrsta>();

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = "SELECT * FROM Vocka_Vrsta";

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    Vocka_Vrsta v = new Vocka_Vrsta();

                    v.id = sqlDataReader.GetInt32(0);
                    v.naziv = sqlDataReader.GetString(1);
                    v.kolicina = sqlDataReader.GetInt32(2);
                    v.cena = sqlDataReader.GetDecimal(3);
                    v.id_vocke = sqlDataReader.GetInt32(4);
                    if (!sqlDataReader.IsDBNull(5))
                    {
                        v.path = sqlDataReader.GetString(5);
                        FileStream stream = new FileStream(v.path, FileMode.Open, FileAccess.Read);
                        BinaryReader brs = new BinaryReader(stream);

                        byte[] imageArray = brs.ReadBytes((int)stream.Length);
                        v.string64 = Convert.ToBase64String(imageArray);
                    }
                    else
                    {
                        v.path = null;

                    }


                    results.Add(v);
                }
            }

            return results;
        }
        public List<Vocka_Vrsta> GetVockaVrsta(string query)
        {
            List<Vocka_Vrsta> results = new List<Vocka_Vrsta>();

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("SELECT * FROM Vocka_Vrsta where naziv LIKE '{0}%'", query);

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    Vocka_Vrsta v = new Vocka_Vrsta();

                    v.id = sqlDataReader.GetInt32(0);
                    v.naziv = sqlDataReader.GetString(1);
                    v.kolicina = sqlDataReader.GetInt32(2);
                    v.cena = sqlDataReader.GetDecimal(3);
                    v.id_vocke = sqlDataReader.GetInt32(4);
                    if (!sqlDataReader.IsDBNull(5))
                    {
                        v.path = sqlDataReader.GetString(5);
                        FileStream stream = new FileStream(v.path, FileMode.Open, FileAccess.Read);
                        BinaryReader brs = new BinaryReader(stream);

                        byte[] imageArray = brs.ReadBytes((int)stream.Length);
                        v.string64 = Convert.ToBase64String(imageArray);
                    }
                    else
                    {
                        v.path = null;

                    }


                    results.Add(v);
                }
            }

            return results;
        }




        static string vr = "";

        public string getnesto(string getal)
        {
            vr = getal;
            return getal;
        }
        public int InsertVoce(Vocka_Vrsta v)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format($"INSERT INTO Vocka_Vrsta(naziv,kolicina,cena,id_vocke" +
                $") VALUES('{v.naziv}'," +
                $"'{v.kolicina}','{v.cena}', '{v.id_vocke}'); SELECT SCOPE_IDENTITY();");
                sqlConnection.Open();
                int res = Convert.ToInt32(sqlCommand.ExecuteScalar());
                Console.WriteLine(res);
                return res;
            }

        }
        public int UpdateVocePath(string val,int id)
        {
            Console.WriteLine("val " + val);
            Console.WriteLine("id " + id);
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {   string filePathName = vr;
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                
                    sqlCommand.CommandText = string.Format("UPDATE Vocka_Vrsta SET path='{0}' WHERE id={1}", val, id);
                
                int result = sqlCommand.ExecuteNonQuery();
                return result;

            }
        }
        public int UpdateVoce(Vocka_Vrsta v)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                if (v.kolicina!=0)
                {
                    sqlCommand.CommandText = string.Format("UPDATE Vocka_Vrsta SET kolicina={0} WHERE id={1}", v.kolicina, v.id);
                }
                else if (v.cena !=0)
                {
                    sqlCommand.CommandText = string.Format("UPDATE Vocka_Vrsta SET cena={0} WHERE id={1}", v.cena, v.id);

                }
                int result = sqlCommand.ExecuteNonQuery();
                return result;

            }
        }
        public int DeleteVoce(int id)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("DELETE FROM Vocka_Vrsta WHERE id={0}", id);
                int result = sqlCommand.ExecuteNonQuery();
                return result;

            }
        }

        public List<Ocena> GetOcena(int id)
        {
            List<Ocena> results = new List<Ocena>();

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("SELECT ocene.id,ocene.ime,ocene.email,ocene.opis,.ocene.broj_zvezdica,ocene.id_vocke_vrste,ocene.datum, vocka_vrsta.path FROM Ocene JOIN Vocka_Vrsta ON ocene.Id_vocke_vrste=vocka_vrsta.id where ocene.id_vocke_vrste={0}", id);

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    Ocena o = new Ocena();
                    o.id = sqlDataReader.GetInt32(0);
                    o.ime = sqlDataReader.GetString(1);
                    o.email = sqlDataReader.GetString(2);
                    o.opis = sqlDataReader.GetString(3);
                    o.broj_zvezdica = sqlDataReader.GetInt32(4);
                    o.id_vocke_vrste = sqlDataReader.GetInt32(5);
                    o.datum = sqlDataReader.GetDateTime(6);
                    if (!sqlDataReader.IsDBNull(7))
                    {
                        o.path = sqlDataReader.GetString(7);
                        FileStream stream = new FileStream(o.path, FileMode.Open, FileAccess.Read);
                        BinaryReader brs = new BinaryReader(stream);

                        byte[] imageArray = brs.ReadBytes((int)stream.Length);
                        o.string64 = Convert.ToBase64String(imageArray);
                    }
                    else
                    {
                        o.path = null;

                    }
                    results.Add(o);
                }
            }
            return results;
        }
        public List<Ocena> GetOcene()
        {
            List<Ocena> results = new List<Ocena>();

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("SELECT ocene.id,ocene.ime,ocene.email,ocene.opis,.ocene.broj_zvezdica,ocene.id_vocke_vrste,ocene.datum, vocka_vrsta.path FROM Ocene JOIN Vocka_Vrsta ON ocene.Id_vocke_vrste=vocka_vrsta.id");

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    Ocena o = new Ocena();
                    o.id = sqlDataReader.GetInt32(0);
                    o.ime = sqlDataReader.GetString(1);
                    o.email = sqlDataReader.GetString(2);
                    o.opis = sqlDataReader.GetString(3);
                    o.broj_zvezdica = sqlDataReader.GetInt32(4);
                    o.id_vocke_vrste = sqlDataReader.GetInt32(5);
                    o.datum = sqlDataReader.GetDateTime(6);
                    if (!sqlDataReader.IsDBNull(7))
                    {
                        o.path = sqlDataReader.GetString(7);
                        FileStream stream = new FileStream(o.path, FileMode.Open, FileAccess.Read);
                        BinaryReader brs = new BinaryReader(stream);

                        byte[] imageArray = brs.ReadBytes((int)stream.Length);
                        o.string64 = Convert.ToBase64String(imageArray);
                    }
                    else
                    {
                        o.path = null;

                    }
                    results.Add(o);
                }
            }

            return results;
        }

        public int InsertOcena(Ocena o)
        {
            Console.WriteLine("ocena" + o.datum);
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("INSERT INTO Ocene(ime, email, opis, broj_zvezdica, id_vocke_vrste, datum) VALUES('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')", o.ime, o.email, o.opis, o.broj_zvezdica, o.id_vocke_vrste, o.datum);
                sqlConnection.Open();

                return sqlCommand.ExecuteNonQuery();
            }
        }  
    }
}
