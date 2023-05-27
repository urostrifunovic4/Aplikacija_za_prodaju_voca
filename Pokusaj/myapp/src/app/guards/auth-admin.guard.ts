import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router) { }      
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
      let url: string = state.url;  
      return this.verifyLogin(url);
}

verifyLogin(url:string) : boolean{
   let status = false; 
   if(!this.isLoggedIn()){
       this.router.navigate(['/home']);
       status= false;
   }
   else if(this.isLoggedIn()){
       status= true;
   }
   return status;
}
public isLoggedIn(): boolean {      
   let status = false;      
   if (localStorage.getItem('isLoggedInAdmin') == "true") {      
      status = true;      
   }
     else {      
      status = false;      
      }      
   return status;      
   }    
}
