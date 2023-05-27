import { Component } from '@angular/core';
import { FruitsService } from '../fruits.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderData:Order[]|undefined
  constructor(private fruitsService:FruitsService) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.fruitsService.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }
  getOrderList(){
    
    this.fruitsService.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }
}
