
import { NgbCarouselConfig, NgbCarouselModule, NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VockaVrsta } from '../models/vockavrsta';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { FruitsService } from '../fruits.service';
import { Cart } from '../models/cart';
import { Ocena } from '../models/ocena';
import { ListaZelja } from '../models/lista';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Contact } from '../models/contact';
import { Vocka } from '../models/vocka';
declare let gapi: any;
@Component({
  selector: 'app-home',
  standalone:true,
  imports:[NgbCarouselModule,NgIf,CommonModule, RouterModule, NgbRatingModule,NgbNavModule, FormsModule,ReactiveFormsModule,SlickCarouselModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vocke?: VockaVrsta[];
  vocka?:VockaVrsta;
  voc:Vocka[];
  ocene?:Ocena[];
  arr?:VockaVrsta[]=[];
  cartData?:VockaVrsta; 
   productData?: VockaVrsta;
   productData1?: VockaVrsta;
   wishData?:VockaVrsta; 
  brzv:number; 
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    autoplay: true, 
    autoplaySpeed: 6000,
    pauseOnFocus: false,
    pauseOnHover: false,
    "arrows":true,
    "infinite": true,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  normalSlideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    autoplay: true, 
    autoplaySpeed: 6000,
    pauseOnFocus: false,
    pauseOnHover: false,
    "arrows":true,
    "infinite": true,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  constructor(private router: Router,private elementRef: ElementRef,private adminService:AdminService,private fruitsService: FruitsService, private route: ActivatedRoute){
    }

  ngOnInit(): void {  
    this.iniSlickJs();
    this.adminService.getAllVoce().subscribe(data=>{this.voc=data;});
    this.adminService.getAllVockaVrsta().subscribe(data=>{this.vocke=data;});
    this.adminService.getOcene().subscribe(data=>{ this.ocene=data;
    } ); 
    setTimeout(() => {
   /*    for(let item = this.vocke.length-5; item<this.vocke.length ; item++){
        console.warn(this.vocke[item].cena);
    } */
   
      
          for(let item = this.ocene.length-5; item<this.ocene.length ; item++){
       let da=   this.vocke.find((element)=>{
      return element.id===this.ocene[item].id_vocke_vrste;
    })
    this.arr.push(da);
          /* console.log(this.ocene[item]);
            if(this.ocene[item].id_vocke_vrste===data.id)
          {
            this.arr.push(data);
          } */
        }
      this.arr.forEach(element => {
        console.warn(element);
      });
    }, 4000);
      
   
  }

  iniSlickJs() {
    const htmlScriptElement = document.createElement('script');
    htmlScriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js';
    this.elementRef.nativeElement.appendChild(htmlScriptElement);
  }
  
doRating(id:number)
{
  let data:Ocena[];
  let d=0;
  let br=0;
  data = this.ocene.filter((oc)=>{
  return oc.id_vocke_vrste===id;

  });
  if(data.length>0)
  {
  data.forEach((item)=>{
   
    if(item.broj_zvezdica)
    {
      d=d+item.broj_zvezdica;
      br++;
    }
  });
  this.brzv=d/br;
  }
  else
{
  this.brzv=0;
}
 
  return true;
}

    addToCart(product: VockaVrsta) { 
      let userId:number; 
    this.adminService.getOneVockaVrsta(product.id).subscribe((result)=>{
     this.productData=result;
     if(localStorage.getItem('token'))
    {  
      let user = localStorage.getItem('token');
     userId = user && JSON.parse(user).id;
      if(user){
      this.fruitsService.getCartList(userId);
      this.fruitsService.cartData.subscribe((result)=>{
        let item:VockaVrsta[] =  result.filter((item:VockaVrsta)=>product.id.toString()===item.id.toString()) 
        if(item.length){
      this.cartData=item[0];
     }
      })
    }
    }
    else{
      userId=0
    }
      });

  setTimeout(()=> {
    if(this.productData)
   {   
    let br=0;
    let idKorpe:number;
     let res: Cart[];
     this.fruitsService.getCartListCheck(userId).subscribe((item)=>{ res=item;
      
  })
 setTimeout(()=>{
  res.forEach((item)=>{
    console.log("item "+item);
    if(item.id_vocka_vrsta===product.id)
      {
        idKorpe=item.id;
        br++;
      }
  }); console.log("br je"+br);
 },500) 
 let cartData:Cart = {
  naziv:this.productData.naziv,
  kolicina:this.productData.kolicina,
  cena:this.productData.cena,
  path:this.productData.path,
  string64:this.productData.string64,
  id_vocka_vrsta:this.productData.id,
  dodata_kolicina:1,
  }
 
 setTimeout(() => {
  if(br===0)
  {
    if(!localStorage.getItem('token'))
    {
        this.fruitsService.localAddToCart(this.productData);
    }
    else{
        cartData.id_kupca=userId;
    }
          this.fruitsService.addToCart(cartData).subscribe((result)=>{
              if(result){
               this.fruitsService.getCartList(userId);
              }
            }) 
    }
    else{
      alert("This product is already in your cart");
      let cartData:Cart = {
       id:idKorpe,
        dodata_kolicina:2,
        }
      this.fruitsService.updateCartQuantity(cartData).subscribe((result)=>{console.log(result)});
    }  
 },500 );   
          
   
} },1000 );
}

insertContact(contact: Contact){
console.warn(contact.mail);
 this.adminService.insertContact(contact).subscribe(response=>{console.log(response)
  if(response){
  //(<HTMLInputElement>document.getElementById('mail')).value===""
  alert("Successful!");
  }
  else {
  alert("Unsuccessful");
  }
});

 }



addToWishList(product: VockaVrsta) {
  this.adminService.getOneVockaVrsta(product.id).subscribe((result)=>{ 
    this.productData1=result; 
    let user = localStorage.getItem('token');
  if(user){
    let userId= user && JSON.parse(user).id;
    this.fruitsService.getWishList(userId);
  
  this.fruitsService.wishData.subscribe((result)=>{
    let item:VockaVrsta[] =  result.filter((item:VockaVrsta)=>product.id.toString()===item.id.toString()) 
    if(item.length){
  this.wishData=item[0];
 }
  })
}
});

setTimeout(()=> {
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
       
      }
    })        
}
}
},1000 );
}
rasp(value:string)
{
  let br:number;
  this.router.navigate(['/products']);
 br= this.voc.findIndex(x => x.naziv ===value);
  
  setTimeout(function(){
    let element:HTMLElement = document.querySelector('#dashboard-nav'+br) as HTMLElement; element.click(); }, 3000);  
}
/* tangerine(value:string)
{
  let br:number;
  this.router.navigate(['/products']);
 br= this.voc.findIndex(x => x.naziv ===value);
  
  setTimeout(function(){
    let element:HTMLElement = document.querySelector('#dashboard-nav'+br) as HTMLElement; element.click(); }, 3000);  
} */
/* blue(value:string)
{
  let br:number;
  this.router.navigate(['/products']);
 br= this.voc.findIndex(x => x.naziv ===value);
  
  setTimeout(function(){
    let element:HTMLElement = document.querySelector('#dashboard-nav'+br) as HTMLElement; element.click(); }, 3000);  
} */
}