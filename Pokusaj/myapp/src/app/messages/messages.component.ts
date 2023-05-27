import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit { 
   contacts:Contact[];
  constructor(private adminService:AdminService){}

ngOnInit()
{
  this.adminService.getAllContact().subscribe((data)=>{this.contacts = data;})
}

}
