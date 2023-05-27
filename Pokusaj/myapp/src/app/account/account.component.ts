import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/assets/utils/validation';
import { FruitsService } from '../fruits.service';
import { KupacService } from '../kupac.service';
import { Address } from '../models/address';
import { Kupac } from '../models/kupac';
import { Order } from '../models/order';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  orderData1:Order[]|undefined
  orderData:Order[]|undefined
  updateDetailForm !: FormGroup; 
  updateDetailForm2 !: FormGroup; 
  updateAddress !: FormGroup; 
  submitted = false;
  submitted2 = false;
  submitted3 = false;
  kupci?:Kupac[];
  kupac:Kupac;
  message: string;
  address?: Address;
  isShow=false;
  type='default';
  constructor(private formBuilder: FormBuilder,private userService:KupacService, private router:Router,private fruitsService:FruitsService) { }

  ngOnInit(): void {
    this.userService.getAllKupac().subscribe((data)=>{this.kupci=data})
   let userData = localStorage.getItem('token');
   let userId:number = JSON.parse(userData).id
    this.userService.getAddress(userId).subscribe((data)=>{this.address=data;})
    this.userService.getKupac(userId).subscribe((data)=>{
      this.kupac=data;
    })
    this.getOrderList();
    
    this.updateDetailForm = this.formBuilder.group({
      ime: ['', [Validators.required]],
      prezime: ['', [Validators.required]],
      broj_telefona: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]]
    })
    this.updateDetailForm2=this.formBuilder.group({
      lozinka: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
      nova_lozinka: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)]],
      potvrditi_lozinku: ['', Validators.required],
    },
    {
      validators: [Validation.match('nova_lozinka', 'potvrditi_lozinku')]
    } )
    this.updateAddress = this.formBuilder.group({
      grad: ['', [Validators.required]],
      ulica_broj: ['', [Validators.required]],
      broj_telefona: ['', [Validators.required]],
      postanski_broj: ['', [Validators.required]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.updateDetailForm.controls;
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.updateDetailForm2.controls;
  }
  get f3(): { [key: string]: AbstractControl } {
    return this.updateAddress.controls;
  }
  cancelOrder(order:Order){
    order.status="Canceled";
     this.fruitsService.updateOrder(order).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }

  getOrderList(){
    this.fruitsService.orderList().subscribe((result)=>{
      this.orderData1=result;
    })
    let one:Order[]= [];
    let two:Order[]= [];
    let three:Order[]= [];
    let four:Order[]= [];
    setTimeout(() => {
      this.orderData1.forEach((item)=>{
        if(item.status==='In progress')
     {
        one.push(item);
     } else if(item.status==='Completed')
     {
        two.push(item);
     }else if(item.status==='Closed')
     {
        three.push(item);
     }
     else if(item.status==='Canceled')
     {
        four.push(item);
     }
    }
     ); 
    this.orderData=[];
    this.orderData.push(...one,...two,...three,...four);
    this.fruitsService.orderData2.emit(this.orderData);
    }, 500);
  }

  logout() {   
    this.userService.logout();  
    this.router.navigate(['/user_login']);  
  }
  
  updateDetailsForm()
  {
    
    this.submitted = true;
    if (this.updateDetailForm.invalid) {
      
     return; 
    }
    else
    {
      this.updateKupac(this.updateDetailForm.value);
      this.updateDetailForm.reset();
      this.submitted=false;
    }
  }
  updateDetailsForm2()
  {
    
    this.submitted2 = true;
    
    if (this.updateDetailForm2.invalid) {
      return;
    }
    else{
    const result2 = this.kupci.find((element) => {
      return element.lozinka===this.updateDetailForm2.value.lozinka;
    });

    if(result2!==undefined){
      console.warn("lozinka"+this.updateDetailForm2.value.nova_lozinka)
      let kupac = new Kupac;
      kupac.lozinka=this.updateDetailForm2.value.nova_lozinka;
      this.updateKupac(kupac)
        this.updateDetailForm2.reset();
        this.submitted2=false;
     }
    else{
      alert("Please check your current password");
    }
  
  }
  }

  updateAddressForm()
  {
    this.submitted3=true;
    if (this.updateAddress.invalid) {
      return;
    }else {
      let address=new Address;
        address.broj_telefona=this.updateAddress.value.broj_telefona;
       address.grad=this.updateAddress.value.grad;
       address.postanski_broj=this.updateAddress.value.postanski_broj;
       address.ulica_broj=this.updateAddress.value.ulica_broj;
       address.id= this.address.id;
       
      this.userService.updateAddress(address).subscribe((data)=>{console.log("resp"+data);
    if(data)
  { 
    alert("Sucsesfull update");
    this.updateAddress.reset();
      this.submitted3=false;
  }
  else{
    alert("Unsucsesfull update");
  }
});
     
      setTimeout(()=>{
        let userData = localStorage.getItem('token');
   let userId:number = JSON.parse(userData).id
      this.userService.getAddress(userId).subscribe((data)=>{console.log("data"+data); this.address =data;})
      },1000);
      setTimeout(() => {
        
      }, 2000);
     
    }
  }
  updateKupac(kupac:Kupac)
  {
    let resp:boolean;
    this.userService.updateKupac(kupac).subscribe(response=>{console.log(response); 
      if(response)
    {
      alert("Sucsesfull update");
    }
    else{
      alert("Unsucsesfull update");
    }
      });
  }
show()
{
  this.type='show';
  this.isShow=true;
}
}
