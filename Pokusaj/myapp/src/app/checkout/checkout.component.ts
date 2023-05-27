import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FruitsService } from '../fruits.service';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KupacService } from '../kupac.service';
import { Kupac } from '../models/kupac';
import { Address } from '../models/address';
import { Kupon } from '../models/kupon';
import { AdminService } from '../admin.service';
import { VockaVrsta } from '../models/vockavrsta';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  shippingPrice: number | undefined;
  subTotalPrice: number | undefined;
  cartData: Cart[] | undefined;
  orderMsg: string | undefined;
  type:string = 'default'; 
  kupci?:Kupac[];
  kupac?:Kupac;
  address?: Address;
  today = new Date();
  ngForm = new FormGroup({
    ime: new FormControl(''),
    prezime: new FormControl(''),
    email: new FormControl(''),
    broj_telefona: new FormControl(''),
    adresa: new FormControl(''),
    grad: new FormControl(''),
    postanski_broj: new FormControl(''),
  }); 
  submitted = false;
  kuponi:Kupon[];
  kupon=new Kupon;
  percent=0;
  constructor(private adminService:AdminService,private userService:KupacService,public matDialog: MatDialog,private formBuilder:FormBuilder,private fruitsService:FruitsService, private router: Router) { }

  ngOnInit(): void { 
    if(localStorage.getItem('token'))
    {
      this.type='user';
    }
    else{
      this.type='default';
    }
    this.adminService.getKuponi().subscribe(data=>{this.kuponi=data});
    this.kupon.procenat=0;
    this.userService.getAllKupac().subscribe(data=>{this.kupci=data;});
    if(localStorage.getItem('token')){
   let userData = localStorage.getItem('token');
   setTimeout(()=>{
   let userId:number = JSON.parse(userData).id
      this.kupac = this.kupci.find((kupac)=>{return kupac.id===userId});
    this.userService.getAddress(userId).subscribe(data=>{this.address=data;})
  },1000);}
    this.ngForm = this.formBuilder.group({
      ime: ['', [Validators.required]],
      prezime: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      broj_telefona: ['', [Validators.required,Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]],
      adresa: ['', [Validators.required]],
      grad: ['', [Validators.required]],
      postanski_broj: ['', [Validators.required]]
    })
     let res:number;
    this.fruitsService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.dodata_kolicina) {
          price = price + (+item.cena * +item.dodata_kolicina)
        }
        if(item.id_iznosa) { 
          res = item.id_iznosa;
          return;
      }
      })
      this.subTotalPrice = price;
      this.shippingPrice=100;
      this.totalPrice = this.subTotalPrice+this.shippingPrice;
      if(res)
      {
        console.log("id iznosa res"+res); 
      this.adminService.getIznos(+res).subscribe((data)=>{console.warn(data);
       console.log("id kupona"+data.id_kupona); 
       if(data.id_kupona)
     { 
      this.kupon = this.kuponi.find(oc=>{return oc.id===data.id_kupona})
     setTimeout(() => {
       this.percent = +(this.kupon.procenat*(this.subTotalPrice/100)).toFixed(2);
      this.totalPrice=+(this.totalPrice - this.percent).toFixed(2); 
     }, 500);
     
     } 
    
    });}

    }) 

  }
  get f(): { [key: string]: AbstractControl } {
    return this.ngForm.controls;
  }
  orderUser(){
   let userId:number;
    if(localStorage.getItem('token')){
    let user = localStorage.getItem('token');
    userId = user && JSON.parse(user).id;
    
    if (this.totalPrice) {
      let orderData: Order = {
        ime: this.kupac.ime,
        prezime:this.kupac.prezime,
        email:this.kupac.email,
        grad:this.address.grad,
        postanski_broj:this.address.postanski_broj,
        adresa:this.address.ulica_broj,
        broj_telefona:this.address.broj_telefona,
        id_kupca:userId,
        ukupnaCena:this.totalPrice,
        status:'In progress',
        datum: this.today
      }
      this.fruitsService.orderNow(orderData).subscribe((result) => { 
        if (result) {
          let d = new Cart();
          d.id_kupca = userId;
          d.id_narudzbine = +result;
          this.fruitsService.updateCartOrder(d).subscribe((result)=>{
            console.warn(result);
           })
          setTimeout(() => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.id = "modal-component";
            dialogConfig.height = "350px";
            dialogConfig.width = "600px";
            const modalDialog = this.matDialog.open(ModalComponent, dialogConfig).afterClosed().subscribe((res)=>{this.router.navigate(['/dashboard']); 
            let vocka= new VockaVrsta; 
            this.cartData.forEach((item)=>{
                if(item.id_vocka_vrsta)
                {
                  vocka.id=item.id_vocka_vrsta;
                  vocka.kolicina=item.kolicina-item.dodata_kolicina;
                  vocka.cena=0;
                  this.adminService.updateVockaVrsta(vocka).subscribe((res)=>{console.warn(res)});
                }
               }); setTimeout(function(){
                
              let element:HTMLElement = document.querySelector('#orders-nav') as HTMLElement; element.click(); }, 500);   
          });
   
          }, 1000);

        }

      })
    }

  }
  }
  orderNow() {
    this.submitted=true;
    if (this.ngForm.invalid) {
      return;
    }
    if(this.ngForm.value.ime && this.ngForm.value.prezime && this.ngForm.value.email && this.ngForm.value.grad && this.ngForm.value.postanski_broj && this.ngForm.value.adresa && this.ngForm.value.broj_telefona){
   let userId:number;
    if(localStorage.getItem('token')){
    let user = localStorage.getItem('token');
    userId = user && JSON.parse(user).id;
  }
  else{
    userId=0;
  }
  console.log("price"+this.totalPrice);
    if (this.totalPrice) {
      let orderData: Order = {
        ime:this.ngForm.value.ime,
        prezime:this.ngForm.value.prezime,
        email:this.ngForm.value.email,
        grad:this.ngForm.value.grad,
        postanski_broj:this.ngForm.value.postanski_broj,
        adresa:this.ngForm.value.adresa,
        broj_telefona:this.ngForm.value.broj_telefona,
        id_kupca:userId,
        ukupnaCena:this.totalPrice,
        status:'In progress',
        datum: this.today
      }
      if(localStorage.getItem('token'))
      {
      this.fruitsService.orderNow(orderData).subscribe((result) => { 
        if (result) {
          let d = new Cart();
          d.id_kupca = userId;
          d.id_narudzbine = +result;
         this.fruitsService.updateCartOrder(d).subscribe((result)=>{
          console.warn(result);
         })
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/dashboard'])
            let vocka= new VockaVrsta; 
            this.cartData.forEach((item)=>{
                if(item.id_vocka_vrsta)
                {
                  vocka.id=item.id_vocka_vrsta;
                  vocka.kolicina=item.kolicina-item.dodata_kolicina;
                  vocka.cena=0;
                  this.adminService.updateVockaVrsta(vocka).subscribe((res)=>{console.warn(res)});
                } });
            setTimeout(function(){
              let element:HTMLElement = document.querySelector('#orders-tab') as HTMLElement; element.click(); }, 500);   
          
          }, 4000);

        }

      })}
      else{
        this.fruitsService.orderNow(orderData).subscribe((result) => { 
          if (result) { 
            this.fruitsService.remove(); 
            let d = new Cart();
            d.id_kupca = userId;
            d.id_narudzbine = +result;
            this.fruitsService.updateCartOrder(d).subscribe((result)=>{
              console.warn(result);
             })
            alert("Order has been placed");
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.id = "modal-component";
            dialogConfig.height = "350px";
            dialogConfig.width = "600px";
            const modalDialog = this.matDialog.open(ModalComponent, dialogConfig)
    
            .afterClosed().subscribe((res)=>{this.router.navigate(['/']); let vocka= new VockaVrsta;  this.cartData.forEach((item)=>{
              if(item.id_vocka_vrsta)
              {
                vocka.id=item.id_vocka_vrsta;
                vocka.kolicina=item.kolicina-item.dodata_kolicina;
                vocka.cena=0;
                this.adminService.updateVockaVrsta(vocka).subscribe((res)=>{console.warn(res)});
              } }); });
        
          }
        })


      }
    }

  }else{
    alert("Podaci nisu popunjeni");
  }
}
  bringTo()
  {
    this.router.navigate(['/dashboard']);
    setTimeout(function(){
      let element:HTMLElement = document.querySelector('#account-nav') as HTMLElement; element.click(); }, 500);   
  }
}
