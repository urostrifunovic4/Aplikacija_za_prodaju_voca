import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { FruitsService } from '../fruits.service';
import { ModalCheckoutComponent } from '../modal-checkout/modal-checkout.component';
import { Cart } from '../models/cart';
import { Kupon } from '../models/kupon';
import { Iznos } from '../models/price';
import { VockaVrsta } from '../models/vockavrsta';

@Component({
  selector: 'app-cart-second',
  templateUrl: './cart-second.component.html',
  styleUrls: ['./cart-second.component.css']
})
export class CartSecondComponent implements OnInit {
  totalamount: number;
  vocke:VockaVrsta[];
  cartData: Cart[] | undefined;
  price = new Iznos;
  percent=0;
  izn:number=0;
filterCode:String;
 type:String='without';
 msg:String="";
 submitted:boolean;
 kuponi:Kupon[];
 kupon=new Kupon;
  constructor(private adminService: AdminService, private fruitsService:FruitsService,public matDialog: MatDialog,private router: Router){}
  ngOnInit(): void {
    this.adminService.getAllVockaVrsta().subscribe(data=>{this.vocke=data;});
    this.adminService.getKuponi().subscribe(data=>{this.kuponi=data});
    this.kupon.procenat=0;
    this.loadDetails();
  }

  handleQuantity(val:string, cartId:number){
  this.cartData.filter((cart:Cart)=>{
    if(cart.id===cartId)
    {
      if(cart.dodata_kolicina<cart.kolicina && val==='plus'){
        cart.dodata_kolicina +=1;
        this.price.cena =this.price.cena + cart.cena;
    }
      else if(cart.dodata_kolicina>1 && val==='min'){
        cart.dodata_kolicina-=1;
        this.price.cena =this.price.cena - cart.cena;
      }
        else if(val==='inp')  //za upis vrednosti
      {
          cart.dodata_kolicina=+(document.getElementById(cartId.toString()) as HTMLInputElement).value;
          this.price.cena =cart.dodata_kolicina * cart.cena;
      }
    this.price.ukupno = this.price.cena + 100;

    this.fruitsService.updateCartQuantity(cart).subscribe((result)=>{console.log(result)});
    this.price.id = cart.id_iznosa;
    console.log("price id "+cart.id_iznosa);
    this.adminService.updateIznos(this.price).subscribe((res)=>{ console.log("res up"+res)});
    if(this.kupon.procenat>0)
    {
    this.percent = +(this.kupon.procenat*(this.price.cena/100)).toFixed(2);
    this.price.ukupno =+(this.price.ukupno - this.percent).toFixed(2);  
  }}
  })
 
} 
loadDetails(){
  this.type='with';
  let price = 0;
  let br=0;
  let res:number;
  let data:number;
  if(localStorage.getItem('isLoggedIn')==='true') {
    let userStore = localStorage.getItem('token');
     data= userStore && JSON.parse(userStore).id;}
  else{
    data=0;
  }
  this.fruitsService.currentCart().subscribe((result) => {
  this.cartData = result;
  
      result.forEach((item) => {
        if (item.dodata_kolicina) {
          price = price + (+item.cena * +item.dodata_kolicina);  
        }
        if(!item.id_iznosa)
        {
          br++;
        }
        if(item.id_iznosa) { 
          res = item.id_iznosa;
          return;
      }
      })  
      this.price.cena = price;
      this.price.dostava=100;
      this.price.taksa=0;
      this.price.ukupno = this.price.cena+100;
      this.kupon=new Kupon();
      if(res)
      {
      this.adminService.getIznos(+res).subscribe((data)=>{console.warn(data);
        if(data.id_kupona)
     { 
      this.kupon = this.kuponi.find(oc=>{return oc.id===data.id_kupona})
      this.percent = +(this.kupon.procenat*(this.price.cena/100)).toFixed(2);
      this.price.ukupno=+(this.price.ukupno - this.percent).toFixed(2); 
      this.submitted=true;
      this.msg="Kupon is applied.";
      (document.getElementById('code') as HTMLInputElement).setAttribute('style', 'border: 1px solid #dddddd;'); //za zabranu opet koriscenja
     } 
    
    });
        this.price.id= res;
        this.adminService.updateIznos(this.price).subscribe((res)=>{ console.log("res"+res)});
      }
  
      if(br<this.cartData.length){ 
        console.warn("d<0");
        let cart=new Cart; 
        cart.id_kupca=data;
        let res=new Number;
        this.cartData.forEach((item)=>{
        if(item.id_iznosa) { 
          res = item.id_iznosa;
          return;
      }})
         cart.id_iznosa=+res;
        this.fruitsService.updateCart(cart).subscribe((res)=>{ console.log("res"+res)});
        this.adminService.updateIznos(this.price).subscribe((res)=>{ console.log("res"+res)});
      }
      else if(br===this.cartData.length)
      {
        console.warn("d===0");
      let cart=new Cart; 
      this.adminService.insertIznos(this.price).subscribe((res)=>{ 
      cart.id_kupca=data;
      cart.id_iznosa=+res;
        this.izn=+res;
       this.fruitsService.updateCart(cart).subscribe((res)=>{ console.log("res"+res)});
       }); 
      }
   
        
    if(!this.cartData.length){
      this.type ='without';
    }
  })
   setTimeout(() => {
    this.fruitsService.currentCart().subscribe((result) => {
      this.cartData = result;
    })
   },1000);
  }

  removeToCart(cartId:number|undefined){
   
      let res:Cart[];
      let br=0
      let id:number;
      if(localStorage.getItem('token'))
      {
      id= JSON.parse(localStorage.getItem('token')).id;
      }
      else 
      {id=0;}
      this.fruitsService.getCartListCheck(id).subscribe((item)=>{res=item})
     setTimeout(() => {
      res.forEach((item)=>{console.log("id"+item.id_iznosa);
        if(item.id_iznosa)
        { 
          br++;
          id=item.id_iznosa;
        }
      })  
     }, 300); 
     
    setTimeout(() => {
      if(localStorage.getItem('token')){
    cartId && this.cartData && this.fruitsService.removeToCart(cartId)
    .subscribe((result)=>{
      this.fruitsService.getCartList(0)
      this.loadDetails();
    })}
    else{
      this.fruitsService.removeItemFromCart(cartId);
      this.fruitsService.removeToCart(cartId).subscribe((result)=>{
        this.fruitsService.getCartList(0)
        this.loadDetails();
      })
    } 
    }, 300); 
    setTimeout(() => {
      if(br===1)
      {
        console.log("delete");
        this.fruitsService.deleteIznos(id).subscribe((res)=>{console.log(res)})
      }
    }, 500);
  }
  applyCode()
  {
    this.kupon=new Kupon();
    var input =  (document.getElementById('code') as HTMLInputElement).value;
    if(input){
    this.kupon = this.kuponi.find(oc=>{return oc.naziv===input})
      if(this.kupon)
      {
        this.percent = +(this.kupon.procenat*(this.price.cena/100)).toFixed(2);
        this.price.ukupno=+(this.price.ukupno - this.percent).toFixed(2); 
        this.submitted=true;
         let iznos = new Iznos;
        iznos.id_kupona=this.kupon.id;
        iznos.id = this.price.id;
        console.log("iznos id "+iznos.id);
        console.log("iznos kupona"+iznos.id_kupona);
        this.adminService.updateIznosKupon(iznos).subscribe((res)=>{console.log(res)}); 
        (document.getElementById('code') as HTMLInputElement).setAttribute('style', 'border: 1px solid #dddddd;');
        this.msg="Kupon is applied.";
      }
      else{
        this.msg="Kupon is invalid.";
        this.submitted=false;
        (document.getElementById('code') as HTMLInputElement).setAttribute('style', 'border: 1px solid red;');
        this.filterCode="";
      }
    }
  }

  checkout() {
    if(localStorage.getItem('isLoggedIn')==='true'){
      this.router.navigate(["/checkout"]);
    }
    else{
    const dialogConfig = new MatDialogConfig();  //da li zelite da se prijvite zxa kupovinu
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(ModalCheckoutComponent, dialogConfig);
    }
  }
}
