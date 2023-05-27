import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { Contact } from '../models/contact';
import { FileToUpload } from '../models/file-to-upload';
import { Vocka } from '../models/vocka';
import { VockaVrsta } from '../models/vockavrsta';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports:[NgbNavModule,NgbNavModule, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public logInForm !: FormGroup;
  vocke?: Vocka[];
  vockavrsta?: VockaVrsta[];
  custFirst='any';
  custSecond='any2';
  custThird='any3';
  combo?: VockaVrsta[]
  active = 'top';
 vocka?:Vocka;
 sub=false;
 selectedItem?:number;
 selectedItemType?:number;
  MAX_SIZE: number = 1048576;
  theFile?: any;
  ngForm:FormGroup;
  ngFormUpdate:FormGroup;
  ngFormInsert:FormGroup;
  ngFormUpdatePrice:FormGroup;
  ngFormUpdateQuantity:FormGroup;
  ngFormUpdatePath:FormGroup;
  form1:FormGroup;
  submitted=false;
  submitted2=false;
  submitted3=false;
  submitted4=false;
  submitted5=false;
  submitted6=false;
  submitted7=false;
messages: string[] = [];
contacts:Contact[];
  constructor(private formBuilder: FormBuilder,private adminService: AdminService, private route: ActivatedRoute,private router: Router){}

  ngOnInit(): void {
   this.loadDetailsType();
    this.loadDetails();
    this.ngForm = this.formBuilder.group(
      {
        naziv: [
          '', [ Validators.required]
        ]
      })
      this.form1 = this.formBuilder.group(
        {
          select: [
            '', [ Validators.required]
          ]
        })
      this.ngFormUpdate = this.formBuilder.group(
        {
          naziv: [ '',[Validators.required]],
          id: ['',[ Validators.required]]
        })
        this.ngFormInsert = this.formBuilder.group(
          {
            naziv: [ '',[Validators.required]],
            kolicina: ['',[ Validators.required]],
            cena: ['',[ Validators.required]],
            select: ['',[ Validators.required]],
            path: [ '',[Validators.required]]
          })
          this.ngFormUpdatePrice = this.formBuilder.group(
            {
              cena: [ '',[Validators.required]],
              select: [
                '', [ Validators.required]
              ]
            })
            this.ngFormUpdateQuantity = this.formBuilder.group(
              {
                kolicina: [ '',[Validators.required]],
              })
              this.ngFormUpdatePath = this.formBuilder.group(
                {
                  path: [ '',[Validators.required]],
                })

}
get f(): { [key: string]: AbstractControl } {
  return this.ngForm.controls;
}
get f2(): { [key: string]: AbstractControl } {
  return this.ngFormUpdate.controls;
}
get f3(): { [key: string]: AbstractControl } {
  return this.ngFormInsert.controls;
}
get f4(): { [key: string]: AbstractControl } {
  return this.ngFormUpdatePrice.controls;
}
get f5(): { [key: string]: AbstractControl } {
  return this.ngFormUpdateQuantity.controls;
}
get f6(): { [key: string]: AbstractControl } {
  return this.ngFormUpdatePath.controls;
}
get f7(): { [key: string]: AbstractControl } {
  return this.form1.controls;
}
loadDetails()
{
   this.adminService.getAllVoce().subscribe(data=>{this.vocke=data;
  this.adminService.getAllFruits();
});
}

loadDetailsType()
{
   this.adminService.getAllVockaVrsta().subscribe(data=>{this.vockavrsta=data;});
   this.adminService.getAllTypeVockaVrsta();
}

onSelected(value:string)
{
  this.combo.forEach(element => {
    if(element.naziv===value)
  {
    this.selectedItem = element.id;
  }
  });
}

FlipOtherCombo(vocka:any){
  
  this.combo = this.vockavrsta.filter((item)=>{return item.id_vocke===+vocka})
  
 setTimeout(() => {
  this.combo.forEach((item)=>{
    console.warn(item);
 }, 200); 
  })
}
updateVockaPrice(vocka: any)
{
  this.submitted4=true;
  if (this.ngFormUpdatePrice.invalid) {
    return;
  }
  else{
  vocka.id = this.selectedItem;
  vocka.kolicina=0;
  this.adminService.updateVockaVrsta(vocka).subscribe((response)=>{console.log(response); 
    if(response){
      alert("Successful update");
      this.adminService.getAllTypeVockaVrsta();
    this.loadDetailsType();
    this.submitted4=false;
    this.ngFormUpdatePrice.reset();
      }
      else{
     alert("Unsuccessful update");
    }
  });
  
}
}
updateVockaQuantity(vocka: any)
{ this.submitted5=true;
  if (this.ngFormUpdateQuantity.invalid) {
    return;
  }
  else{
  vocka.id = this.selectedItem;
  vocka.cena=0;
  this.adminService.updateVockaVrsta(vocka).subscribe((response)=>{console.log(response);
     if(response){
    alert("Successful update");
    this.adminService.getAllTypeVockaVrsta();
 this.loadDetailsType();
 this.submitted5=false;
    this.ngFormUpdateQuantity.reset();
    }
    else{
   alert("Unsuccessful update");
}});
   }
}
onSelectedType(value:string)
{
  this.vocke.forEach(element => {
    if(element.naziv===value)
  {
    this.selectedItemType = element.id;
  }
  });
}
updateVockaPath(vocka: any)
{
  this.submitted6=true;
  this.submitted7=true;
  if (this.ngFormUpdatePath.invalid) {
    return;
  }
  else{
  vocka.kolicina=0;
  vocka.cena=0;
  console.warn("sel"+this.selectedItem);
  console.warn("id vocke"+this.theFile.id);
  this.readAndUploadFile(this.theFile,this.selectedItem);
  setTimeout(() => {
     this.adminService.getAllTypeVockaVrsta();
      this.loadDetailsType();
       this.submitted6=false;
    this.ngFormUpdatePath.reset();
  }, 1000); 
 
}
}
 private readAndUploadFile(theFile: any,id:number) {
  let file = new FileToUpload();
  file.fileName = this.theFile.name;
  file.fileSize = this.theFile.size;
  file.fileType = this.theFile.type;
  file.lastModifiedTime = this.theFile.lastModified;
  file.lastModifiedDate = this.theFile.lastModifiedDate;
  file.id=id;
  let reader = new FileReader();
  
  reader.onload = () => {
  file.fileAsBase64 = reader.result.toString();
      
      this.adminService.uploadFile(file).subscribe(resp => { 
        if(resp){
          this.adminService.getAllTypeVockaVrsta();
      this.loadDetailsType();
          alert("Upload complete."); 
        
        }
          else{
            alert("Please upload another image.")
          }
        }); 
  }
  reader.readAsDataURL(this.theFile)
} 
 uploadFile(): void {
  this.readAndUploadFile(this.theFile,this.selectedItem);
}  
 onFileChange(event:any) {
  this.theFile = null;
  if (event.target.files && event.target.files.length > 0) {
      if (event.target.files[0].size < this.MAX_SIZE) {
          this.theFile = event.target.files[0];
      }
      else {
         alert("File: " + event.target.files[0].name + " is too large to upload.");
      }
  }}

insertVocka(vocka: Vocka){
  this.submitted=true;
  if (this.ngForm.invalid) {
    return;
  }
  else{
  this.adminService.insertVocka(vocka).subscribe(response=>{if(response){
  alert("Successful insert");
    this.adminService.getAllFruits();
    this.loadDetails(); 
    this.submitted=false;
    this.ngForm.reset();
   
  }else{
    alert("Unsuccessful");
  }
});}
}

insertVockaVrsta(vockavrsta: VockaVrsta){
  this.submitted3=true;
  /* if((<HTMLInputElement>document.getElementById('imagePath')).value==="")
    {
        this.sub=true;
    }
    else{
       this.sub=false;
    } */
  if (this.ngFormInsert.invalid) {
    return;
  }
  else{
 vockavrsta.id_vocke=this.selectedItemType;
  this.adminService.insertVockaVrsta(vockavrsta).subscribe(response=>{if(response){
    this.theFile.id = response;
    console.warn("id vocke"+this.theFile.id);
    alert("Successful insert");
    this.readAndUploadFile(this.theFile,+response);
    this.submitted3=false;
    this.ngFormInsert.reset({ select: '' });
    /* (<HTMLInputElement>document.getElementById('imagePath')).value=""; */
    
  }
else{
  alert("Unsuccessful insert");
}});}
}

updateVocka(vocka: Vocka){
  console.warn(vocka.naziv);
  this.submitted2=true;
  if (this.ngFormUpdate.invalid) {
    return;
  }
  else{
  this.adminService.updateVocka(vocka).subscribe(response=>{
    if(response){
    alert("Successful update");
    this.adminService.getAllFruits();
    this.loadDetails();
    this.submitted2=false;
    this.ngFormUpdate.reset();
  }
    else{
      alert("Unsuccessful update");
    }
  });}
}

deleteVocka(vocka?: Vocka){
  this.adminService.deleteVocka(vocka?.id).subscribe((result)=>{
    if(result){
    this.adminService.getAllFruits();
    this.loadDetails();}
  })}

deleteVockaVr(vocka?: VockaVrsta){
  this.adminService.deleteVockaVr(vocka?.id).subscribe((result)=>{
    if(result){
    this.adminService.getAllTypeVockaVrsta();
    this.loadDetailsType();}
  })
}

delete(vocka: Vocka): void {
  this.vocke = this.vocke?.filter(h => h !== vocka);
  this.adminService.deleteVocka(vocka.id).subscribe();
}

deleteVocka2(vocka: Vocka, id?: number){
  this.adminService.deleteVocka2(vocka,id).subscribe(response=>{console.log(response)});
}

}
