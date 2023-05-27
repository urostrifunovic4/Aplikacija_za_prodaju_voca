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
  public class KorpaRepository:IKorpaRepository
    {
        public List<Korpa> GetAllKorpa(int id)
        {
            List<Korpa> results = new List<Korpa>();
            if (id == 0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("SELECT * FROM Korpa where id_kupca IS NULL AND id_narudzbine IS NULL");

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Korpa k = new Korpa();
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
                        k.dodata_kolicina = sqlDataReader.GetInt32(9);
                        if (!sqlDataReader.IsDBNull(7))
                        {
                            k.id_iznosa = sqlDataReader.GetInt32(7);
                        }
                        else
                        {
                            k.id_iznosa = null;
                        }
                        results.Add(k);
                    }
                }

            }
            else if(id>0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("SELECT * FROM Korpa where id_kupca={0} AND id_narudzbine IS NULL", id);

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Korpa k = new Korpa();
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
                        k.dodata_kolicina = sqlDataReader.GetInt32(9);
                        if (!sqlDataReader.IsDBNull(7))
                        {
                            k.id_iznosa=sqlDataReader.GetInt32(7);
                        }
                        else
                        {
                            k.id_iznosa = null;
                        }
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
                    sqlCommand.CommandText = string.Format("SELECT * FROM Korpa where id_narudzbine is not null");

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Korpa k = new Korpa();
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
                       
                        if (!sqlDataReader.IsDBNull(6))
                        {
                            k.id_kupca = sqlDataReader.GetInt32(6);
                        }
                        else
                        {
                            k.id_kupca = null;
                        }
                        k.id_narudzbine = sqlDataReader.GetInt32(8);
                        k.dodata_kolicina = sqlDataReader.GetInt32(9);
                        if (!sqlDataReader.IsDBNull(7))
                        {
                            k.id_iznosa = sqlDataReader.GetInt32(7);
                        }
                        else
                        {
                            k.id_iznosa = null;
                        }
                        results.Add(k);
                    }
                }
            }

            return results;
        }

        public int DeleteKorpa(int id)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("DELETE FROM Korpa WHERE id_vocka_vrsta={0}", id);
                int result = sqlCommand.ExecuteNonQuery();
                return result;

            }
        }

        public int InsertKorpa(Korpa k)
        {

            if (k.id_kupca == 0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();

                    sqlCommand.Connection = sqlConnection;
                    if (string.IsNullOrEmpty((string)k.path))
                    {
                        sqlCommand.CommandText = string.Format($"INSERT INTO Korpa(naziv,kolicina,cena,path,id_vocka_vrsta,id_kupca,dodata_kolicina" +
                               $") VALUES('{k.naziv}'," +
                               $"'{k.kolicina}','{k.cena}',null,'{k.id_vocka_vrsta}',null,'{k.dodata_kolicina}')");
                    }
                    else
                    {
                        sqlCommand.CommandText = string.Format($"INSERT INTO Korpa(naziv,kolicina,cena,path,id_vocka_vrsta,id_kupca,dodata_kolicina" +
                    $") VALUES('{k.naziv}'," +
                    $"'{k.kolicina}','{k.cena}','{k.path}','{k.id_vocka_vrsta}',null,'{k.dodata_kolicina}')");
                    }

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
                    if (string.IsNullOrEmpty((string)k.path))
                    {
                        sqlCommand.CommandText = string.Format($"INSERT INTO Korpa(naziv,kolicina,cena,path,id_vocka_vrsta,id_kupca,dodata_kolicina" +
                    $") VALUES('{k.naziv}'," +
                    $"'{k.kolicina}','{k.cena}',null,'{k.id_vocka_vrsta}','{k.id_kupca}','{k.dodata_kolicina}')");
                    }
                    else
                    {
                        sqlCommand.CommandText =string.Format($"INSERT INTO Korpa(naziv,kolicina,cena,path,id_vocka_vrsta,id_kupca,dodata_kolicina" +
                    $") VALUES('{k.naziv}'," +
                    $"'{k.kolicina}','{k.cena}','{k.path}','{k.id_vocka_vrsta}','{k.id_kupca}','{k.dodata_kolicina}')");

                    }
                    sqlConnection.Open();

                    return sqlCommand.ExecuteNonQuery();
                }
            }
        }

        public int UpdateKorpa(Korpa k)
        {

            if (k.id_kupca == 0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("UPDATE Korpa SET id_iznosa={0}  WHERE id_kupca is null", k.id_iznosa);
                  
                    return sqlCommand.ExecuteNonQuery();
                }
            }
            else
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("UPDATE Korpa SET id_iznosa={0} WHERE id_kupca={1}", k.id_iznosa, k.id_kupca);
                     return sqlCommand.ExecuteNonQuery();
                }
            }
        }
        public int UpdateKorpaKolicina(Korpa k)
        {

            
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("UPDATE Korpa SET dodata_kolicina={0} WHERE id={1}", k.dodata_kolicina, k.id);
                      return sqlCommand.ExecuteNonQuery();
                }
           
        }
        public int UpdateKorpaIdKupca(Korpa k)
        {


            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("UPDATE Korpa SET id_kupca={0} WHERE id_kupca is null", k.id_kupca);
                
                return sqlCommand.ExecuteNonQuery();
            }

        }
        public int UpdateKorpaNarudzbina(Korpa k)
        {

            if (k.id_kupca != 0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("UPDATE Korpa SET id_narudzbine={0} WHERE id_narudzbine is null and id_kupca={1}", k.id_narudzbine, k.id_kupca);
                  
                    return sqlCommand.ExecuteNonQuery();
                }
            }
            else
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("UPDATE Korpa SET id_narudzbine={0} WHERE id_narudzbine is null and id_kupca is null", k.id_narudzbine);
                   
                    return sqlCommand.ExecuteNonQuery();
                }
            }

        }

        public List<Narudzbina> GetAllNarudzbina(int id)
        {
            
            List<Narudzbina> results = new List<Narudzbina>();
            if (id == 0)
            {

                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("SELECT * FROM Narudzbina where id_kupca is null");

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Narudzbina n = new Narudzbina();
                        n.id = sqlDataReader.GetInt32(0);
                        n.ime = sqlDataReader.GetString(1);
                        n.prezime = sqlDataReader.GetString(2);
                        n.email = sqlDataReader.GetString(3);
                        n.adresa = sqlDataReader.GetString(4);
                        n.grad = sqlDataReader.GetString(5);
                        n.postanski_broj = sqlDataReader.GetString(6);
                        n.broj_telefona = sqlDataReader.GetString(7);
                        n.ukupnaCena = sqlDataReader.GetDecimal(8);
                        n.status = sqlDataReader.GetString(10);
                        n.datum = sqlDataReader.GetDateTime(11);


                        results.Add(n);
                    }
                }
            }
            else if(id>0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("SELECT * FROM Narudzbina where id_kupca={0}", id);

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Narudzbina n = new Narudzbina();
                        n.id = sqlDataReader.GetInt32(0);
                        n.ime = sqlDataReader.GetString(1);
                        n.prezime = sqlDataReader.GetString(2);
                        n.email = sqlDataReader.GetString(3);
                        n.adresa = sqlDataReader.GetString(4);
                        n.grad = sqlDataReader.GetString(5);
                        n.postanski_broj = sqlDataReader.GetString(6);
                        n.broj_telefona = sqlDataReader.GetString(7);
                        n.ukupnaCena = sqlDataReader.GetDecimal(8);
                        n.id_kupca = sqlDataReader.GetInt32(9);
                        n.status = sqlDataReader.GetString(10);
                        n.datum = sqlDataReader.GetDateTime(11);


                        results.Add(n);
                    }
                }
            }
            else
            {
              
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("SELECT * FROM Narudzbina");

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Narudzbina n = new Narudzbina();
                        n.id = sqlDataReader.GetInt32(0);
                        n.ime = sqlDataReader.GetString(1);
                        n.prezime = sqlDataReader.GetString(2);
                        n.email = sqlDataReader.GetString(3);
                        n.adresa = sqlDataReader.GetString(4);
                        n.grad = sqlDataReader.GetString(5);
                        n.postanski_broj = sqlDataReader.GetString(6);
                        n.broj_telefona = sqlDataReader.GetString(7);
                        n.ukupnaCena = sqlDataReader.GetDecimal(8);
                        n.status = sqlDataReader.GetString(10);
                        n.datum = sqlDataReader.GetDateTime(11);


                        results.Add(n);
                    }
                }
            }

            return results;
        }

        public int DeleteNarudzbina(int id)
        {
            Console.WriteLine("nar " + id);
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("DELETE FROM Korpa WHERE id_narudzbine={0}", id);
                sqlCommand.ExecuteNonQuery();
               

                SqlCommand sqlCommand1 = new SqlCommand();
                sqlCommand1.Connection = sqlConnection;
                sqlCommand1.CommandText = string.Format("DELETE FROM Narudzbina WHERE id={0}", id);
              return    sqlCommand1.ExecuteNonQuery();
            

            }
           
        }

        public int InsertNarudzbina(Narudzbina n)
        {
            if (n.id_kupca == 0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("INSERT INTO Narudzbina (ime,prezime,email,adresa,grad,postanski_broj,broj_telefona,UkupnaCena,id_kupca,status,datum) VALUES ('{0}', '{1}','{2}','{3}','{4}','{5}','{6}','{7}',null,'{8}','{9}'); SELECT SCOPE_IDENTITY();", n.ime, n.prezime, n.email, n.adresa, n.grad, n.postanski_broj, n.broj_telefona, n.ukupnaCena, n.status, n.datum);

                    sqlConnection.Open();

                    int res = Convert.ToInt32(sqlCommand.ExecuteScalar());
                    Console.WriteLine(res);
                    return res;
                }
            }
            else
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("INSERT INTO Narudzbina (ime,prezime,email,adresa,grad,postanski_broj,broj_telefona,UkupnaCena,id_kupca,status,datum) VALUES ('{0}', '{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}'); SELECT SCOPE_IDENTITY();", n.ime, n.prezime, n.email, n.adresa, n.grad, n.postanski_broj, n.broj_telefona, n.ukupnaCena, n.id_kupca, n.status, n.datum);

                    sqlConnection.Open();

                    int res = Convert.ToInt32(sqlCommand.ExecuteScalar());
                    Console.WriteLine(res);
                    return res;
                }
            }
        }

        public int UpdateNarudzbina(Narudzbina n)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("UPDATE Narudzbina SET status='{0}' where id={1}",n.status,n.id);

                sqlConnection.Open();

                int res = Convert.ToInt32(sqlCommand.ExecuteScalar());
                Console.WriteLine(res);
                return res;
            }
        }

        public int DeleteKorpaId(int id)
        {
            if (id == 0)
            {
                using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand();
                    sqlCommand.Connection = sqlConnection;
                    sqlCommand.CommandText = string.Format("DELETE FROM Korpa WHERE id_kupca is null");
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
                    sqlCommand.CommandText = string.Format("DELETE FROM Korpa WHERE id_kupca={0}", id);
                    int result = sqlCommand.ExecuteNonQuery();
                    return result;

                }
            }
        }
        public List<Kupon> GetKuponi()
        {
            List<Kupon> results = new List<Kupon>();

            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = "SELECT * FROM Kupon";

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    Kupon v = new Kupon();

                    v.id = sqlDataReader.GetInt32(0);
                    v.naziv = sqlDataReader.GetString(1);
                    v.procenat = sqlDataReader.GetInt32(2);

                    results.Add(v);
                }
            }
            return results;
        }
        public int InsertKupon(Kupon o)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText =string.Format($"INSERT INTO Kupon(naziv,procenat" +
                $") VALUES('{o.naziv}','{o.procenat}')");
                sqlConnection.Open();

                return sqlCommand.ExecuteNonQuery();
            }
        }

        public int InsertIznos(Iznos i)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText =string.Format($"INSERT INTO Iznos(cena,taksa,dostava,ukupno" +
                $") VALUES('{i.cena}','{i.taksa}','{i.dostava}','{i.ukupno}'); SELECT SCOPE_IDENTITY();");
                sqlConnection.Open();
                int res=Convert.ToInt32(sqlCommand.ExecuteScalar());
                Console.WriteLine(res);
                return res;
            }
        }

        public Iznos GetIznos(int id)
        {
           
            Iznos n = new Iznos();
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("SELECT * FROM Iznos where id={0}",id);

                sqlConnection.Open();

                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                while (sqlDataReader.Read())
                {   n.id = sqlDataReader.GetInt32(0);
                    n.cena = sqlDataReader.GetDecimal(1);
                    n.taksa = sqlDataReader.GetInt32(2);
                    n.dostava = sqlDataReader.GetInt32(3);
                    n.ukupno = sqlDataReader.GetDecimal(4);
                    if (!sqlDataReader.IsDBNull(5))
                    {
                        n.id_kupona = sqlDataReader.GetInt32(5);
                    }
                }
               return n;
            }

        }

        public int UpdateIznos(Iznos i)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("UPDATE Iznos SET cena={0},taksa={1},dostava={2},ukupno={3}  WHERE id={4}", i.cena,i.taksa,i.dostava,i.ukupno, i.id);
               

                return sqlCommand.ExecuteNonQuery();
            }
        }
        public int UpdateIznosKupon(Iznos i)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
               
                    sqlCommand.CommandText = string.Format("UPDATE Iznos SET id_kupona={0}  WHERE id={1}", i.id_kupona, i.id);
                
                return sqlCommand.ExecuteNonQuery();
            }
        }

        public int DeleteIznos(int id)
        {
            using (SqlConnection sqlConnection = new SqlConnection(Constants.connectionString))
            {
                sqlConnection.Open();

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = string.Format("DELETE FROM Iznos WHERE id={0}",id);
                int result = sqlCommand.ExecuteNonQuery();
                return result;

            }
        }
    }
}
