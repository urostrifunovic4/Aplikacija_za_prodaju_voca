import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/assets/utils/validation';
import { KupacService } from '../kupac.service';
import { Kupac } from '../models/kupac';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted: boolean;
kupci?:Kupac[];
  constructor(private formBuilder: FormBuilder,private userService:KupacService, private router: Router) {}

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
        pol: ['male', Validators.required],
        ulica_broj: ['', Validators.required],
        grad: ['', Validators.required],
        postanski_broj: ['', Validators.required],
        broj_telefona: ['', [Validators.required,Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]],
        email: ['', [Validators.required, Validators.email]],
        potvrditi_lozinku: ['', Validators.required],
      },
      {
        validators: [Validation.match('lozinka', 'potvrditi_lozinku')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else
    {
      this.userService.insertAddress(this.form.value).subscribe((data)=>{console.log("resp"+data);
    
      let k=new Kupac;
      k=this.form.value;
      k.id_adresa=+data;
      this.insertKupac(k);
  
    });
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  insertKupac(kupac: Kupac){
    this.userService.insertKupac(kupac).subscribe(response=>{
      if(response)
      {
        alert("You have successfully registered!")
        this.router.navigate(["/user_login"]);
      }
    });
  }
  
  updateVocka(kupac: Kupac, id?: string){
    this.userService.updateKupac(kupac).subscribe(response=>{console.log(response)});
  
  }

}
