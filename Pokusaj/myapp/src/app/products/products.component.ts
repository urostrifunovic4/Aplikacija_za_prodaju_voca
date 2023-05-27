import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { FruitsService } from '../fruits.service';
import { LoaderService } from '../loader.service';
import { Cart } from '../models/cart';
import { ListaZelja } from '../models/lista';
import { Ocena } from '../models/ocena';
import { Vocka } from '../models/vocka';
import { VockaVrsta } from '../models/vockavrsta';

@Component({
  selector: 'app-products',
  standalone: true,
	imports: [NgbNavModule, CommonModule, FormsModule, RouterModule, NgbRatingModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  vocke?: Vocka[];
  active:any = 0;
  vockavrsta?: VockaVrsta[];
  getvocke?: VockaVrsta[];
  cartData?:VockaVrsta; 
   productData?: VockaVrsta;
   productData1?: VockaVrsta;
   wishData?: VockaVrsta;
   ocene?:Ocena[];
   brzv=0;
   type="default";
   dt: any;
    dataDisplay: any;
  constructor(public loader: LoaderService,private formBuilder: FormBuilder,private fruitsService:FruitsService,private adminService: AdminService, private route: ActivatedRoute,private router: Router){}

  ngOnInit(): void {
  
  this.adminService.getAllVoce().subscribe(data=>{this.vocke=data;});
  this.adminService.getAllVockaVrsta().subscribe(data=>{this.vockavrsta=data;});
  this.adminService.getOcene().subscribe(data=>{ this.ocene=data;}); 
 setTimeout(function(){
    let element:HTMLElement = document.querySelector('#dashboard-nav0') as HTMLElement; element.click(); 
  }, 3000);   //kad izlista voce, zbog there no products
   this.hideloader();
  }
ngAfterViewInit():void{   
}
hideloader():void {
  
  document.getElementById('loading')
      .style.display = 'none';
}
getVrsta(id:number)
{ 
this.getvocke = this.vockavrsta.filter(e=>e.id_vocke===id);

if(this.getvocke.length>0)
{
  this.type="fruits";
}
else{
  this.type="default";
}

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
  userId=0  //ako nije prijavljen
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

addToWishList(product: VockaVrsta) {
  this.adminService.getOneVockaVrsta(product.id).subscribe((result)=>{
    this.productData1=result; 
    console.log("pr1"+this.productData1.id);
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

}
