import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { FruitsService } from './fruits.service';
import { KupacService } from './kupac.service';
import { VockaVrsta } from './models/vockavrsta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myapp';  
  id: string; 
  menuType:String='default';
  userName:string="";
  cartItems=0;
  wishItems=0;
  menu = true;
  res:boolean=true;
  searchResult:undefined|VockaVrsta[];
  constructor(private route:Router, private adminService:AdminService,private userService:KupacService, private fruitsService:FruitsService){}
  ngOnInit(): void {
    
    this.route.events.subscribe((val:any)=>{
      if(val.url)
      {
        if(localStorage.getItem('token') && localStorage.getItem('isLoggedIn'))
        {
          var m = localStorage.getItem('token')
          let userData=m && JSON.parse(m);
          this.fruitsService.getCartList(userData.id);
          this.fruitsService.getWishList(userData.id);
          this.menuType = 'logged';
          let str = userData.ime[0].toUpperCase() + userData.ime.slice(1);
          let str2 = userData.prezime[0].toUpperCase() + userData.prezime.slice(1);
          this.userName = str+' '+str2;
          this.menu=true;
        } 
        else if(localStorage.getItem('tokenAdmin') && localStorage.getItem('isLoggedInAdmin'))
        {
          this.menuType='adminlogged';
          this.menu=false;
        }
        else{
          this.menuType='default';
          this.menu=true;
        }
      
     }
    });
   
   let cartData=localStorage.getItem('localCart');
   if(cartData)
   {
    this.cartItems=JSON.parse(cartData).length;
   }
   this.fruitsService.cartData.subscribe((items)=>{
       this.cartItems=items.length;
  });
  let wishData=localStorage.getItem('localWish');
   if(wishData)
   {
    this.wishItems=JSON.parse(wishData).length;
   }
   this.fruitsService.wishData.subscribe((items)=>{
       this.wishItems=items.length;
  });
  }

  logout() {  
    this.userService.logout();  
    this.route.navigate(['/'])
    this.fruitsService.cartData.emit([]);
    this.fruitsService.wishData.emit([]);
  }
  searchProduct(query:KeyboardEvent){
    this.res=true;
    if(query){
      console.warn("query is "+query);
      const element = query.target as HTMLInputElement;
      this.fruitsService.searchProduct(element.value).subscribe((result)=>{
       
        if(result.length>5){
          result.length=length
        }
        if(result.length===0)
        {
          this.res=false;
        }
        this.searchResult=result;
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined
  }
  redirectToDetails(id:number){
    this.route.navigate(['/detail/'+id]);
  }
  submitSearch(val:string){
    console.warn(val)
  this.route.navigate([`search/${val}`]).then(() => {
    window.location.reload();
  });
  }
  logoutAdmin() {   
    this.adminService.logout();  
    this.route.navigate(['/']);  
  }
  fruit()
  {
    this.route.navigate(['/products']);
    setTimeout(function(){
      let element:HTMLElement = document.querySelector('#dashboard-nav0') as HTMLElement; element.click(); 
    }, 1000);  
  }
  order()
  {
    this.route.navigate(['/admin-orders']).then(() => {
      window.location.reload();
    });
  }
  user()
  {
    this.route.navigate(['/admin-users']).then(() => {
      window.location.reload();
    });
  }
  fruits()
  {
    this.route.navigate(['/admin-fruits']).then(() => {
      window.location.reload();
    });
  }
  myaccount()
  {
    this.route.navigate(['/dashboard']).then(() => {
      window.location.reload();
    });
  }
}
