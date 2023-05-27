import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { FruitsService } from '../fruits.service';
import { Cart } from '../models/cart';
import { ListaZelja } from '../models/lista';
import { Ocena } from '../models/ocena';
import { VockaVrsta } from '../models/vockavrsta';

@Component({
  selector: 'app-detail',
 standalone: true,
  imports: [NgbRatingModule, NgbNavModule,NgbNavModule, FormsModule, CommonModule,ReactiveFormsModule],
  
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  currentRate:number = 1;
   cartData?:VockaVrsta; 
   productData?: VockaVrsta;
   wishData?:VockaVrsta; 
   productData1?: VockaVrsta;
   ocena?: Ocena={};
   ocene?: Ocena[];
   oceneIspis?: Ocena[];
   oceneIspisStar?: Ocena[];
   removeCart=false;
  kol:number=1;
  form:FormGroup;
  submitted = false;
  prid:number;
  today = new Date();
  removeWish=false;
  ocenaItems=0;
  type='default';
  typeOcena='default';
  typeOc='default';
  brzv:any;
  br1=0;
  br2=0;
  br3=0;
  br4=0;
  br5=0;
  br1bar=0;
  br2bar=0;
  br3bar=0;
  br4bar=0;
  br5bar=0;
  constructor(private fruitsService:FruitsService,private formBuilder: FormBuilder,private adminService: AdminService, private route: ActivatedRoute,private router: Router){} 
  ngOnInit(): void {
      this.prid=Number(this.route.snapshot.paramMap.get('id')); 

     this.adminService.getOcena(this.prid)
    this.adminService.getOcenaID(this.prid).subscribe((res)=>{
      this.ocene=res;
    })
      this.adminService.ocenaData.subscribe((items)=>{
        this.ocenaItems=items.length;
        
   });
     this.prid && this.adminService.getOneVockaVrsta(this.prid).subscribe((result)=>{ 
        this.productData=result; 
        console.warn("pr"+this.productData.string64);
      let cartData = localStorage.getItem('localCart');
    if(this.prid && cartData)
    {
      let items= JSON.parse(cartData);
      items=items.filter((vocka:VockaVrsta)=>this.prid===vocka.id);
      if(items.length)
      {
      this.removeCart=true;}
      else{
        this.removeCart=false;
      }
    }
    let user = localStorage.getItem('token');
    if(user){
      let userId= user && JSON.parse(user).id;
      this.fruitsService.getCartList(userId);

      this.fruitsService.cartData.subscribe((result)=>{
        let item:VockaVrsta[] =  result.filter((item:VockaVrsta)=>this.prid.toString()===item.id.toString()) 
        if(item.length){
      this.cartData=item[0];
      this.removeCart=true;
     }
      })
    }
  })

  this.prid && this.adminService.getOneVockaVrsta(this.prid).subscribe((result)=>{
    this.productData1=result; 
  let wishData = localStorage.getItem('localWish');
if(this.prid && wishData)
{
  let items= JSON.parse(wishData);
  items=items.filter((vocka:VockaVrsta)=>this.prid===vocka.id);
  if(items.length)
  {
  this.removeWish=true;}
  else{
    this.removeWish=false;
  }
}
let user = localStorage.getItem('token');
if(user){
  let userId= user && JSON.parse(user).id;
  this.fruitsService.getWishList(userId);

  this.fruitsService.wishData.subscribe((result)=>{
    let item:VockaVrsta[] =  result.filter((item:VockaVrsta)=>this.prid.toString()===item.id.toString()) 
    if(item.length){
  this.wishData=item[0];
  this.removeWish=true;
 }
  })
}
})

  this.form = this.formBuilder.group(
    {
      
      ime: [
        '',[Validators.required]
      ],

      email: [
        '',[Validators.required]
      ],
      opis: ['',[Validators.required]],
    }
  );
  }

  ngAfterViewInit():void{   
    this.loadDetails();
  }

  Star(star:string)
  {console.log("star"+star);
  this.oceneIspis = this.ocene.filter((oc)=>oc.id_vocke_vrste===this.prid);
    if(star==='1 star')
    {
   this.oceneIspis=this.oceneIspis.filter((oc)=>oc.broj_zvezdica===1);
    }
    if(star==='2 star')
    {
   this.oceneIspis=this.oceneIspis.filter((oc)=>oc.broj_zvezdica===2);
    }
    if(star==='3 star')
    {
   this.oceneIspis=this.oceneIspis.filter((oc)=>oc.broj_zvezdica===3);
    }
    if(star==='4 star')
    {
   this.oceneIspis=this.oceneIspis.filter((oc)=>oc.broj_zvezdica===4);
    }
    if(star==='5 star')
    {
   this.oceneIspis=this.oceneIspis.filter((oc)=>oc.broj_zvezdica===5);
    }
    if(this.oceneIspis.length>0)
    {
      this.typeOc='default';
    }
    else{
      this.typeOc='null';
    }
  }
  loadDetails()
  {
    this.br1=0;
  this.br2=0;
  this.br3=0;
  this.br4=0;
  this.br5=0;
    setTimeout(()=>{
    let d=0;
    let br=0;
      this.oceneIspis = this.ocene.filter((oc)=>oc.id_vocke_vrste===this.prid);
     if(this.oceneIspis.length>0) 
     {
      this.type='review'
      this.oceneIspis.forEach((item)=>{
     
        if(item.broj_zvezdica)
        {
          d=d+item.broj_zvezdica;
          br++;
        }
        if(item.broj_zvezdica===5)
        {
          this.br5++;
        }
        if(item.broj_zvezdica===4)
        {
          this.br4++
        }
        if(item.broj_zvezdica===3)
        {
          this.br3++
        }
        if(item.broj_zvezdica===2)
        {
          this.br2++
        }
        if(item.broj_zvezdica===1)
        {
          this.br1++
        }
      });
      this.brzv=(d/br).toFixed(2);
      this.br1bar=(this.br1/100)*100;
      this.br2bar=(this.br2/100)*100;
      this.br3bar=(this.br3/100)*100;
      this.br4bar=(this.br4/100)*100;
      this.br5bar=(this.br5/100)*100;
     }else
     {
       this.brzv=0;
     }
    }, 500);  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  insertOcena(id:number){
    this.submitted=true;
    if(this.form.value.email && this.form.value.ime, this.form.value.opis){
    this.ocena.datum=this.today;
   this.ocena.broj_zvezdica = this.currentRate;
    this.ocena.id_vocke_vrste = id;
    this.ocena.email= this.form.value.email;
    this.ocena.ime=this.form.value.ime;
    this.ocena.opis=this.form.value.opis;

    this.adminService.insertOcena(this.ocena).subscribe(response=>{console.log(response);  
      if(response){
      this.adminService.getOcena(this.prid);
       this.typeOcena='success';
     }});
    
     setTimeout(()=>{
     this.adminService.getOcenaID(this.prid).subscribe((res)=>{console.log("getId"+res);
      this.ocene=res;
    });
     this.loadDetails();},500)
    }
    }

addToCart() {
     if(this.productData)
     {   
     if(!localStorage.getItem('token')){
            this.fruitsService.localAddToCart(this.productData);
            let cartData:Cart = {
              naziv:this.productData.naziv,
              kolicina:this.productData.kolicina,
              cena:this.productData.cena,
              path:this.productData.path,
              string64:this.productData.string64,
              id_vocka_vrsta:this.productData.id,
              dodata_kolicina:this.kol
              }
              this.fruitsService.addToCart(cartData).subscribe((result)=>{
                if(result){
                 this.fruitsService.getCartList(0);
                 this.removeCart=true
                }
              })     
            } 
      else{
           let user = localStorage.getItem('token');
           let userId:number = user && JSON.parse(user).id;
           let cartData:Cart = {
           naziv:this.productData.naziv,
           kolicina:this.productData.kolicina,
           cena:this.productData.cena,
           path:this.productData.path,
           string64:this.productData.string64,
           id_vocka_vrsta:this.productData.id,
           id_kupca:userId,
           dodata_kolicina:this.kol
           }
           this.fruitsService.addToCart(cartData).subscribe((result)=>{
            if(result){
             this.fruitsService.getCartList(userId);
             this.removeCart=true
            }
          })        
     }
}
}

addToWishList() {
 
if(this.productData1)
{   
if(!localStorage.getItem('token')){
      this.fruitsService.localAddToWishList(this.productData1);
      let wishData:ListaZelja = {
        id_vocka_vrsta:this.productData1.id,
        }
        this.fruitsService.addToWishList(wishData).subscribe((result)=>{
          if(result){
           this.fruitsService.getWishList(0);
           this.removeWish=true;
          }
        })     
      } 
else{
     let user = localStorage.getItem('token');
     let userId:number = user && JSON.parse(user).id;
     let wishData:ListaZelja = {
     id_vocka_vrsta:this.productData1.id,
     id_kupca:userId
     }
     this.fruitsService.addToWishList(wishData).subscribe((result)=>{
      if(result){
       this.fruitsService.getWishList(userId);
       this.removeWish=true;
      }
    })        
}
}
}

  handleQuantity(val:string){
    if(this.kol<this.productData.kolicina && val==='plus'){
      this.kol+=1;
    }else if(this.kol>1 && val==='min'){
      this.kol-=1;
    }
  }
 removeToCart (prid:number)
 {
  if(!localStorage.getItem('token')){
    this.fruitsService.removeItemFromCart(prid)
    this.fruitsService.removeToCart(prid).subscribe((result)=>{
      this.fruitsService.getCartList(0)
    })
  }else{
           this.fruitsService.removeToCart(prid).subscribe((result)=>{
           
            let user = localStorage.getItem('token');
            let userId= user && JSON.parse(user).id;
            this.fruitsService.getCartList(userId)
         } ) 
        }
        this.removeCart=false;
      }

      removeToWish (prid:number)
      {
       if(!localStorage.getItem('token')){
         this.fruitsService.removeItemFromWishList(prid)
         this.fruitsService.removeToWish(prid).subscribe((result)=>{
           this.fruitsService.getWishList(0)
         })
       }else{
                this.fruitsService.removeToWish(prid).subscribe((result)=>{
                
                 let user = localStorage.getItem('token');
                 let userId= user && JSON.parse(user).id;
                 this.fruitsService.getWishList(userId)
              } ) 
             }
             this.removeWish=false;
           }
 }

