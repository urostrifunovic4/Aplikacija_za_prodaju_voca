import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Admin } from '../models/admin';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admin?: Admin;
 public logInForm !: FormGroup; 
  submitted = false;
  returnUrl:string;
  constructor(private formBuilder: FormBuilder,private adminService: AdminService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

      this.adminService.getAdmin().subscribe(data=>{
           this.admin=data;
       });
       this.logInForm = this.formBuilder.group({
        name: ['', [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)]],
        psw: ['', [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)]]
      })
       
      this.returnUrl = '/admin-fruits';  
      this.adminService.logout();
}
get f(): { [key: string]: AbstractControl } {
  return this.logInForm.controls;
}
 
logIn()
 {

  this.submitted = true;
 if(this.admin?.korisnicko_ime.trim() === this.logInForm.value.name && this.admin?.lozinka.trim() == this.logInForm.value.psw) 
{
  localStorage.setItem('isLoggedInAdmin', "true");  
      localStorage.setItem('tokenAdmin', JSON.stringify(this.admin));  
  alert('Login Succesful');
        this.logInForm.reset()
      this.router.navigate([this.returnUrl])
}
else{
  
  alert("Please check your username and password.")
}
}

}

