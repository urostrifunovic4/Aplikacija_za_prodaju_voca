using BusinessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProdavnicaVoca.Controllers
{

    [Route("api/[controller]")]
    [ApiController]


    public class MainController : ControllerBase
    {
        private IKupacBusiness kupacBusiness;
        private IVockaBusiness vockaBusiness;
        private IVockaVrstaBusiness vockaVrstaBusiness;
        private IAdminBusiness adminBusiness;
        private IKorpaBusiness korpaBusiness;
        private IListaZeljaBusiness listaZeljaBusiness;
        private IContactBusiness contactBusiness;
        private readonly IConfiguration _configuration;
        const string FILE_PATH = @"E:\Sajt-projekat-gotov\Pokusaj\Samples\";

        public MainController(IConfiguration configuration,IContactBusiness contactBusiness, IKupacBusiness kupacBusiness, IVockaBusiness vockaBusiness, IVockaVrstaBusiness vockaVrstaBusiness, IAdminBusiness adminBusiness, IKorpaBusiness korpaBusiness, IListaZeljaBusiness listaZeljaBusiness)
        {
            this.kupacBusiness = kupacBusiness;
            this.vockaBusiness = vockaBusiness;
            this.vockaVrstaBusiness = vockaVrstaBusiness;
            this.adminBusiness = adminBusiness;
            this.korpaBusiness = korpaBusiness;
            this.listaZeljaBusiness = listaZeljaBusiness;
            this.contactBusiness = contactBusiness;
            _configuration = configuration;

        }

        //ZA KUPCA
        [HttpGet("getAllKupac")]
        public List<KupacKlasa> GetAllKupac()
        {
            return this.kupacBusiness.GetAllKupac();
        }

        [HttpGet("getAddress/{id}")]
        public Object GetAddress(int id)
        {
            return this.kupacBusiness.GetAddress(id);
        }

        [HttpPut("updateAddress")]
        public bool UpdateKupac([FromBody] Adresa k)
        {
            return this.kupacBusiness.UpdateAddress(k);
        }
        [HttpPost("insertAddress")]
        public int InsertAddress([FromBody] Adresa a)
        {
            return this.kupacBusiness.InsertAddress(a);
        }

        [HttpPost("insertKupac")]
        public bool InsertKupac([FromBody] KupacKlasa k)
        {
            return this.kupacBusiness.InsertKupac(k);
        }

        [HttpPut("updateKupac")]
        public bool UpdateKupac([FromBody] KupacKlasa k)
        {
            return this.kupacBusiness.UpdateKupac(k);
        }

        [HttpGet("getOneKupac/{user}")]
        public KupacKlasa GetOneKupac(string user)
        {
            return this.kupacBusiness.GetOneKupac(user);
        }
        [HttpGet("getKupac/{id}")]
        public KupacKlasa GetKupac(int id)
        {
            return this.kupacBusiness.GetKupac(id);
        }

        [HttpGet("getSameUsernameKupac/{username}")]
        public List<KupacKlasa> GetSameUsernameKupac(string username)
        {
            return this.kupacBusiness.GetSameUsername(username);
        }

        [HttpGet("getUsernameKupac/{var}")]
        public string GetUsernameKupac(string var)
        {
            return this.kupacBusiness.usernameGet(var);
        }
        [HttpDelete("deleteKupac/{id}")]
        public bool DeleteKupac(int id)
        {
            return this.kupacBusiness.DeleteKupac(id);
        }


        //ZA VOCE

        [HttpGet("getAllVocka")]
        public List<Vocka> GetAllVocka()
        {
            return this.vockaBusiness.GetAllVocka();
        }

        [HttpPost("insertVocka")]
        public bool InsertVocka([FromBody] Vocka v)
        {
            return this.vockaBusiness.InsertVockaVrsta(v);
        }

        [HttpPut("updateVocka")]
        public bool UpdateVocka([FromBody] Vocka v)
        {
            return this.vockaBusiness.UpdateVockaVrsta(v);
        }


        [HttpPost("fileToUpload")]
        public bool Res([FromBody] FileToUpload theFile)
        {
            var filePathName = FILE_PATH + Path.GetFileNameWithoutExtension(theFile.FileName) + "-" +
                DateTime.Now.ToString().Replace("/", "").Replace(":", "").Replace(" ", "") +
                Path.GetExtension(theFile.FileName);
           

            if (theFile.FileAsBase64.Contains(","))
            {
                theFile.FileAsBase64 = theFile.FileAsBase64.Substring(theFile.FileAsBase64.IndexOf(",") + 1);
            }

            theFile.FileAsByteArray = Convert.FromBase64String(theFile.FileAsBase64);


            using (var fs = new FileStream(filePathName, FileMode.CreateNew))
            {
                fs.Write(theFile.FileAsByteArray, 0, theFile.FileAsByteArray.Length);
            }
            
           return this.vockaVrstaBusiness.UpdateVockaVrstaPath(filePathName,theFile.id);
            
        }

        [HttpDelete("deleteVocka/{id}")]
        public bool DeleteVocka(int id)
        {
            return this.vockaBusiness.DeleteVockaVrsta(id);
        }
        [HttpGet("getNazivVocka/{id}")]
        public string GetNazivVocka(int id)
        {
            return this.vockaBusiness.GetNaziv(id);
        }

        //ZA VOCE VRSTU
        [HttpGet("getOneVockaVrsta/{id}")] 
        public Vocka_Vrsta GetOneVockaVrsta(int id) 
        { return this.vockaVrstaBusiness.GetOneVockaVrsta(id); }
        [HttpGet("getVockaVrsta/{query}")]
        public List<Vocka_Vrsta> GetVockaVrsta(string query)
        { return this.vockaVrstaBusiness.GetVockaVrsta(query); }

        [HttpGet("getAllVockaVrsta")]
        public List<Vocka_Vrsta> GetAllVockaVrsta()
        {
            return this.vockaVrstaBusiness.GetAllVockaVrsta();
        }

        [HttpPost("insertVockaVrsta")]
        public int InsertVockaVrsta([FromBody] Vocka_Vrsta v)
        {
            return this.vockaVrstaBusiness.InsertVockaVrsta(v);
        }

        [HttpPut("updateVockaVrsta")]
        public bool UpdateVockaVrsta([FromBody] Vocka_Vrsta v)
        {
            return this.vockaVrstaBusiness.UpdateVockaVrsta(v);
        }

        [HttpDelete("deleteVockaVrsta/{id}")]
        public bool DeleteVockaVrsta(int id)
        {
            return this.vockaVrstaBusiness.DeleteVockaVrsta(id);
        }

        //za admina
        [HttpGet("getAdmin")]
        public Admin GetAdmin()
        {
            return this.adminBusiness.GetAdmin();
        }

        //za ocenu
        [HttpGet("getOcena/{id}")]
        public List<Ocena> GetOcena(int id)
        {
            return this.vockaVrstaBusiness.GetOcena(id);
        }
        [HttpGet("getOcene")]
        public List<Ocena> GetOcene()
        {
            return this.vockaVrstaBusiness.GetOcene();
        }
        [HttpPost("insertOcena")]
        public bool InsertOcena([FromBody] Ocena o)
        {
            return this.vockaVrstaBusiness.InsertOcena(o);
        }

        //za kupon
        [HttpGet("getKuponi")]
        public List<Kupon> GetKuponi()
        {
            return this.korpaBusiness.GetKuponi();
        }
        [HttpPost("insertKupon")]
        public bool InsertKuponi([FromBody] Kupon o)
        {
            return this.korpaBusiness.InsertKupon(o);
        }
        //za iznos
        [HttpPost("insertIznos")]
        public int InsertKuponi([FromBody] Iznos i)
        {
            return this.korpaBusiness.InsertIznos(i);
        }
        [HttpGet("getIznos/{id}")]
        public Iznos GetIznos(int id)
        {
            return this.korpaBusiness.GetIznos(id);
        }
        [HttpPut("updateIznos")]
        public bool UpdateIznos([FromBody] Iznos i)
        {
            return this.korpaBusiness.UpdateIznos(i);
        }
        [HttpPut("updateIznosKupon")]
        public bool UpdateIznosKupon([FromBody] Iznos i)
        {
            return this.korpaBusiness.UpdateIznosKupon(i);
        }
        [HttpDelete("deleteIznos/{id}")]
        public bool DeleteIznos(int id)
        {
            return this.korpaBusiness.DeleteIznos(id);
        }


        //za korpu
        [HttpGet("getKorpa/{id}")]
        public List<Korpa> GetKorpa(int id)
        {
            return this.korpaBusiness.GetAllKorpa(id);
        }
        [HttpPost("insertKorpa")]
        public bool InsertKorpa([FromBody] Korpa k)
        {
            return this.korpaBusiness.InsertKorpa(k);
        }

        [HttpDelete("deleteKorpa/{id}")]
        public bool DeleteKorpa(int id)
        {
            return this.korpaBusiness.DeleteKorpa(id);
        }
        [HttpDelete("deleteKorpaId/{id}")]
        public bool DeleteKorpaId(int id)
        {
            return this.korpaBusiness.DeleteKorpaId(id);
        }
        [HttpPut("updateKorpa")]
        public bool UpdateKorpa([FromBody] Korpa k)
        {
            return this.korpaBusiness.UpdateKorpa(k);
        }
        [HttpPut("updateKorpaNarudzbina")]
        public bool UpdateKorpaNarudzbina([FromBody] Korpa k)
        {
            return this.korpaBusiness.UpdateKorpaNarudzbina(k);
        }
        [HttpPut("updateKorpaKolicina")]
        public bool UpdateKorpaKolicina([FromBody] Korpa k)
        {
            return this.korpaBusiness.UpdateKorpaKolicina(k);
        }
        [HttpPut("updateKorpaIdKupca")]
        public bool UpdateKorpaIdKupca([FromBody] Korpa k)
        {
            return this.korpaBusiness.UpdateKorpaidKupca(k);
        }
        //za listu zelja
        [HttpGet("getListaZelja/{id}")]
        public List<ListaZelja> GetListaZelja(int id)
        {
            return this.listaZeljaBusiness.GetListaZelja(id);
        }
        [HttpPost("insertListaZelja")]
        public bool InsertListaZelja([FromBody] ListaZelja k)
        {
            return this.listaZeljaBusiness.InsertListaZelja(k);
        }

        [HttpDelete("deleteListaZelja/{id}")]
        public bool DeleteListaZelja(int id)
        {
            return this.listaZeljaBusiness.DeleteListaZelja(id);
        }
        [HttpDelete("deleteListaZeljaId/{id}")]
        public bool DeleteListaZeljaId(int id)
        {
            return this.listaZeljaBusiness.DeleteListaZeljaId(id);
        }
        [HttpPut("updateListaZelja")]
        public bool UpdateListaZelja([FromBody] ListaZelja k)
        {
            return this.listaZeljaBusiness.UpdateListaZelja(k);
        }

        //za narudzbinu
        [HttpGet("getNarudzbina/{id}")]
        public List<Narudzbina> GetNarudzbina(int id)
        {
            return this.korpaBusiness.GetAllNarudzbina(id);
        }
        [HttpPost("insertNarudzbina")]
        public int InsertNarudzbina([FromBody] Narudzbina n)
        {
            return this.korpaBusiness.InsertNarudzbina(n);
        }

        [HttpDelete("deleteNarudzbina/{id}")]
        public bool DeleteNarudzbina(int id)
        {
            return this.korpaBusiness.DeleteNarudzbina(id);
        }
        [HttpPut("updateNarudzbina")]
        public bool UpdateNarudzbina([FromBody] Narudzbina n)
        {
       
            return this.korpaBusiness.UpdateNarudzbina(n);
        }
        [HttpGet("getAllContact")]
        public List<Contact> GetAllContact()
        {
            return this.contactBusiness.GetAllContact();
        }

        [HttpPost("insertContact")]
        public bool InsertContact([FromBody] Contact c)
        {
            return this.contactBusiness.InsertContact(c);
        }
    }
}
