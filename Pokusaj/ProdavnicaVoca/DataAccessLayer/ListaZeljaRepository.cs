using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
   public class ListaZeljaRepository:IListaZeljaRepository
    {
        public List<ListaZelja> GetListaZelja(int id)
        {
            List<ListaZelja> results = new List<ListaZelja>();
            if (id == 0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("SELECT listaZelja.id, vocka_vrsta.naziv,vocka_vrsta.kolicina,vocka_vrsta.cena,vocka_vrsta.path, listazelja.id_vocka_vrsta FROM ListaZelja JOIN vocka_vrsta ON listazelja.id_vocka_vrsta=vocka_vrsta.id where id_kupca IS NULL");

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        ListaZelja k = new ListaZelja();
                        k.id = sqlDataReader.GetInt32(0);
                        k.naziv = sqlDataReader.GetString(1);
                        k.kolicina = sqlDataReader.GetInt32(2);
                        k.cena = sqlDataReader.GetDecimal(3);
                        if (!sqlDataReader.IsDBNull(4))
                        {
                            k.path = sqlDataReader.GetString(4);
                            FileStream stream = new FileStream(k.path, FileMode.Open, FileAccess.Read);
                            BinaryReader brs = new BinaryReader(stream);

                            byte[] imageArray = brs.ReadBytes((int)stream.Length);
                            k.string64 = Convert.ToBase64String(imageArray);
                        }
                        else
                        {
                            k.path = null;

                        }
                        k.id_vocka_vrsta = sqlDataReader.GetInt32(5);
                        results.Add(k);
                    }
                }

            }
            else
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("SELECT listaZelja.id, vocka_vrsta.naziv, vocka_vrsta.kolicina, vocka_vrsta.cena, vocka_vrsta.path, listazelja.id_vocka_vrsta,listazelja.id_kupca FROM ListaZelja JOIN vocka_vrsta ON listazelja.id_vocka_vrsta = vocka_vrsta.id  where id_kupca={0}", id);

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        ListaZelja k = new ListaZelja();
                        k.id = sqlDataReader.GetInt32(0);
                        k.naziv = sqlDataReader.GetString(1);
                        k.kolicina = sqlDataReader.GetInt32(2);
                        k.cena = sqlDataReader.GetDecimal(3);
                        if (!sqlDataReader.IsDBNull(4))
                        {
                            k.path = sqlDataReader.GetString(4);
                            FileStream stream = new FileStream(k.path, FileMode.Open, FileAccess.Read);
                            BinaryReader brs = new BinaryReader(stream);

                            byte[] imageArray = brs.ReadBytes((int)stream.Length);
                            k.string64 = Convert.ToBase64String(imageArray);
                        }
                        else
                        {
                            k.path = null;

                        }
                        k.id_vocka_vrsta = sqlDataReader.GetInt32(5);
                        k.id_kupca = sqlDataReader.GetInt32(6);

                        results.Add(k);
                    }
                }
            }
            return results;
        }

        public int DeleteListaZelja(int id)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("DELETE FROM ListaZelja WHERE id_vocka_vrsta={0}", id);
                int result = sqlCommand.ExecuteNonQuery();
                return result;

            }
        }

        public int DeleteListaZeljaId(int id, int id_vocke)
        {
            if (id == 0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("DELETE FROM ListaZelja WHERE id_kupca is null && id_vocke_vrste={0}", id_vocke);
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
                    sqlCommand.CommandText = string.Format("DELETE FROM ListaZelja WHERE id_kupca={0} && id_vocke_vrste={1}", id, id_vocke);
                    int result = sqlCommand.ExecuteNonQuery();
                    return result;

                }
            }
        }

        public int InsertListaZelja(ListaZelja k)
        {
            if (k.id_kupca == 0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format($"INSERT INTO ListaZelja(id_vocka_vrsta,id_kupca" +
                    $") VALUES('{k.id_vocka_vrsta}',null)");
                    sqlConnection.Open();

                    return sqlCommand.ExecuteNonQuery();
                }
            }
            else
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText =string.Format($"INSERT INTO ListaZelja(id_vocka_vrsta,id_kupca" +
                    $") VALUES('{k.id_vocka_vrsta}','{k.id_kupca}')");
                    sqlConnection.Open();

                    return sqlCommand.ExecuteNonQuery();
                }
            }
        }

        public int UpdateListaZelja(ListaZelja k)
        {
            throw new NotImplementedException();
        }

        public int DeleteListaZeljaId(int id)
        {
            throw new NotImplementedException();
        }

    }
}
