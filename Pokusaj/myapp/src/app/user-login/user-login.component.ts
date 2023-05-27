import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/assets/utils/validation';
import { FruitsService } from '../fruits.service';
import { KupacService } from '../kupac.service';
import { Cart } from '../models/cart';
import { Kupac } from '../models/kupac';
import { ListaZelja } from '../models/lista';
import { VockaVrsta } from '../models/vockavrsta';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false; 
  message: string;  
    returnUrl: string;
kupci?:Kupac[];
  constructor(private fruitsService:FruitsService,private formBuilder: FormBuilder,private userService:KupacService, private router: Router) {}

  ngOnInit(): void {

    this.userService.getAllKupac().subscribe(data=>{this.kupci=data;});

    this.form = this.formBuilder.group(
      {
        
        korisnicko_ime: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],

        lozinka: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        ime: ['', Validators.required],
        prezime: ['', Validators.required],
        pol: ['', Validators.required],
        adresa: ['', Validators.required],
        broj_telefona: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }
    );
    this.returnUrl = '/dashboard';  
  this.userService.logout();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {

    this.submitted = true;
       const result = this.kupci.find((element) => {
        return element.korisnicko_ime===this.form.value.korisnicko_ime;
      });
      const result2 = this.kupci.find((element) => {
        return element.lozinka===this.form.value.lozinka;
      });
   

      if(result !== undefined && result2!==undefined){
        localStorage.setItem('isLoggedIn', "true");  //is logged naziv, true vrednost elementa  
      localStorage.setItem('token', JSON.stringify(result));  //token podaci o kupcu koji se logovao, prevod u json
      alert("Login successful");
       this.router.navigate([this.returnUrl]); 
       this.localCartToRemoteCart();
       this.localCartToRemoteWishList()
       }
      else{
        alert("Please check your username and password");
        this.message = "Please check your username and password"; 
      } }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  insertKupac(kupac: Kupac){
    this.userService.insertKupac(kupac).subscribe(response=>{console.log(response)});
  }
  
  updateKupac(kupac: Kupac, id?: string){
    this.userService.updateKupac(kupac).subscribe(response=>{console.log(response)});
  
  }
  localCartToRemoteCart()
  {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('token'); //vraca ceo objekat pa mora da se parsira 
      let userId = user && JSON.parse(user).id;
     if(data){
      let cart = new Cart;
      cart.id_kupca = userId;
      this.fruitsService.updateCartIdUser(cart).subscribe((result)=>{
        if(result){
          console.warn("data is stored in DB");
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(()=>{
this.fruitsService.getCartList(userId);
    },2000);
  }

  localCartToRemoteWishList()
  {
    let data = localStorage.getItem('localWish');
    let user=localStorage.getItem('token');
      let userId = user && JSON.parse(user).id;
     if(data){
     let wishDataList:VockaVrsta[]= JSON.parse(data);
  
     wishDataList.forEach((product,index)=>{  
      let vr:string="";
      console.warn("Vr je "+vr);
       if(product.path!==undefined)
       {
          vr=product.path;
       }
       else
       {
        vr=null;
       }
       console.warn("Vr je "+vr);
        let wishData:ListaZelja={
           id_vocka_vrsta:product.id,
            id_kupca:userId,
         
        }
        delete wishData.id;
        setTimeout(()=>
        {
          this.fruitsService.addToWishList(wishData).subscribe((result)=>{
            if(result){
              console.warn("data is stored in DB");
            }
          })
          
        },500);
        if(wishDataList.length===index+1)
        {
          localStorage.removeItem('localWish');
        }
      })
    }

    setTimeout(()=>{
this.fruitsService.getWishList(userId);
    },2000);
  }


}




