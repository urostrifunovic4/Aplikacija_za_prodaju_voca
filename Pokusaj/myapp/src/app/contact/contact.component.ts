import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
 contacts?: Contact[];
 submitted = false;
form: FormGroup = new FormGroup({
  name: new FormControl(''),
});

  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.adminService.getAllContact().subscribe(data=>{
      this.contacts=data;});
  }

  insertContact(contact: Contact){
    this.adminService.insertContact(contact).subscribe((response)=>{console.log(response);
      if(response)
      {
      this.klik();
    }  });
  }

  klik(){
  window.alert('Thank you!');
  window.location.reload();
}

onSubmit(): void {
  this.submitted = true;
 
    const result = this.contacts.find((element) => {
      return element.name===this.form.value.name;
    });

    if(result !== undefined) 
      alert("Logovanje uspesno");
    else{
      alert("pogresni podaci");
    }
  console.log(JSON.stringify(this.form.value, null, 2));
}

}
