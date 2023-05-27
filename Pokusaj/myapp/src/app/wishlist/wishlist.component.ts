import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { FruitsService } from '../fruits.service';
import { Cart } from '../models/cart';
import { ListaZelja } from '../models/lista';
import { VockaVrsta } from '../models/vockavrsta';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  totalamount: number;
  vocke:VockaVrsta[];
wishData: ListaZelja[] | undefined;
type:String='without';
  constructor(private adminService: AdminService, private router: Router, private fruitsService:FruitsService){}
  ngOnInit(): void {
    this.adminService.getAllVockaVrsta().subscribe(data=>{this.vocke=data;});

this.loadDetails();
  }
 
  loadDetails(){
    this.type='with';
    if(localStorage.getItem('isLoggedIn')==='true') {
      this.fruitsService.currentWishCart().subscribe((result) => {
        this.wishData = result;


      if(!this.wishData.length){
        this.type ='without';
      }
  
      })}
      else{
        this.fruitsService.currentWishCart().subscribe((result) => {
          this.wishData = result;
      if(!this.wishData.length){
        this.type ='without';
      }
      })}
      
    }
  
    removeToWish(wishId:number|undefined){
      if(localStorage.getItem('token')){

      wishId && this.wishData && this.fruitsService.removeToWish(wishId)
      .subscribe((result)=>{
        this.fruitsService.getWishList(0)
        this.loadDetails();
      })}
      else{
        this.fruitsService.removeItemFromWishList(wishId);
        this.fruitsService.removeToWish(wishId).subscribe((result)=>{
          this.fruitsService.getWishList(0)
          this.loadDetails();
        })
      } 
    }
  
}
