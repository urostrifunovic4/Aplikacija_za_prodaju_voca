import { Injectable } from '@angular/core';      
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';      
     
@Injectable({      
   providedIn: 'root'      
})      
export class AuthGuard implements CanActivate {      
   constructor(private router: Router) { }      
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
      let url: string = state.url;  
      return this.verifyLogin(url);
}

verifyLogin(url:string) : boolean{
   let status = false; 
   if(!this.isLoggedIn()){
       this.router.navigate(['/user_login']);
       status= false;
   }
   else if(this.isLoggedIn()){
       status= true;
   }
   return status;
}
public isLoggedIn(): boolean {      
   let status = false;      
   if (localStorage.getItem('isLoggedIn') == "true") {      
      status = true;      
   }
     else {      
      status = false;      
      }      
   return status;      
   }    
}    