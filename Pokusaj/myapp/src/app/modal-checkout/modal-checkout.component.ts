import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-checkout',
  templateUrl: './modal-checkout.component.html',
  styleUrls: ['./modal-checkout.component.css']
})
export class ModalCheckoutComponent implements OnInit {
  
  constructor(private router: Router,public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit() {
  }

  actionFunction() {
    this.dialogRef.close();
   this.router.navigate(['/user_login']);
  }

  closeModal() {
    this.dialogRef.close();
    this.router.navigate(['/checkout'])
  }

}
