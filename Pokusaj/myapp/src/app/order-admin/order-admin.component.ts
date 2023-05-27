import { Component } from '@angular/core';
import { FruitsService } from '../fruits.service';
import { Cart } from '../models/cart';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent {
  orderDataUn:Order[]|undefined;
  orderData:Order[]|undefined;
  cartData?:Cart[];
  user?:Order;
  id:number;
  val:string;
  constructor(private fruitsService:FruitsService) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  deleteOrder(orderId:number|undefined){
    console.log("or "+orderId);
    orderId && this.fruitsService.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }
  getOrderList(){
    
    this.fruitsService.orderList().subscribe((result)=>{
      this.orderDataUn=result;
      this.fruitsService.orderData.emit(result);
    })
    let one:Order[]= [];
    let two:Order[]= [];
    let three:Order[]= [];
    let four:Order[]= [];
   setTimeout(() => {
     this.orderDataUn.forEach((item)=>{item.expanded=false
     if(item.status==='In progress')
     {
        one.push(item);
     } else if(item.status==='Completed')
     {
        two.push(item);
     }else if(item.status==='Closed')
     {
        three.push(item);
     }
     else if(item.status==='Canceled')
     {
        four.push(item);
     }
    }
     ); 
    this.orderData=[];
    this.orderData.push(...one,...two,...three,...four);
    this.fruitsService.orderData.emit(this.orderData);
   }, 1000);
    this.fruitsService.currentCart().subscribe((item)=>{console.log(item);
      this.cartData=item;
    });
  }
  findDetails(data:Order) { 
    this.user = this.orderData.find((item)=>{
      return item.id_kupca === data.id_kupca;
  })
    return this.cartData.filter((item)=>item.id_narudzbine ==data.id);
  }
  Status(orderId:number,id:number)
  {
    console.warn("order"+orderId);
   
   this.id=id;
    
      let element:HTMLElement = document.querySelector("[id='"+orderId+"']") as HTMLElement; element.click();  
  }
 
  onSelected(value:string, orderId:number)
  {
    console.log("value"+value);
    console.log("order "+orderId);
    this.id=-1;
    this.orderData.forEach(element => {
      if(element.id===orderId)
      {
        element.status=value;
      }
      
    });
    let order=new Order;
    order.id=orderId;
    order.status=value;
    this.fruitsService.updateOrder(order).subscribe((result)=>{})
  }
  
}
