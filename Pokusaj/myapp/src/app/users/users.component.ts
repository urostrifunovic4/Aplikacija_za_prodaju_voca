import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FruitsService } from '../fruits.service';
import { KupacService } from '../kupac.service';
import { Address } from '../models/address';
import { Kupac } from '../models/kupac';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  kupci?:Kupac[];
  address:Address;
  len=0;
  constructor(private formBuilder: FormBuilder,private userService:KupacService, private router:Router,private fruitsService:FruitsService) { }
  ngOnInit(): void {
    this.loadDetails();
  }
  deleteUser(kupac?: Kupac){
    this.userService.deleteKupac(kupac.id_adresa).subscribe((result)=>{
        if(result)
        {
          this.loadDetails();
        }
    })
  }
  loadDetails()
{
  this.userService.getAllKupac().subscribe(data=>{this.kupci=data;
    this.userService.userData.emit(data);
    this.len = data.length;
  });
  setTimeout(() => {
    this.kupci.forEach((item)=>{
      console.log("item" +item.id)
    this.userService.getAddress(item.id).subscribe(data=>{item.adresa=data.ulica_broj+', '+data.postanski_broj+' '+data.grad; console.log("data"+item.adresa);
    })
  })
  }, 1000);  
}
}
