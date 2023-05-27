import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './models/cart';
import { ListaZelja } from './models/lista';
import { Order } from './models/order';
import { VockaVrsta } from './models/vockavrsta';

@Injectable({
  providedIn: 'root'
})
export class FruitsService {
  cartData = new EventEmitter<VockaVrsta[]|[]>(); //eventemmiter na klik da izracuna broj proizvoda iz korpe
  wishData = new EventEmitter<VockaVrsta[]|[]>();
  orderData = new EventEmitter<Order[]|[]>();
  orderData2 = new EventEmitter<Order[]|[]>();
  constructor(private http: HttpClient) { }

  localAddToCart(product: VockaVrsta) {
    let cartData=[];
    let localCart=localStorage.getItem('localCart');
    if(!localCart)
    {    
      localStorage.setItem('localCart',JSON.stringify([product]));
      this.cartData.emit([product]);  //emitovanje podataka kroz odredjeni proizvod
  }else{
     cartData=JSON.parse(localCart);
     cartData.push(product);
     localStorage.setItem('localCart',JSON.stringify(cartData));
    this.cartData.emit(cartData);
    }
  }
  localAddToWishList(product: VockaVrsta) {
    let wishData=[];
    let localWish=localStorage.getItem('localWish');
    if(!localWish)
    {    
      localStorage.setItem('localWish',JSON.stringify([product]));
      this.wishData.emit([product]);
  }else{
     wishData=JSON.parse(localWish);
     wishData.push(product);
     localStorage.setItem('localWish',JSON.stringify(wishData));
    this.wishData.emit(wishData);
    }
  }
  addToCart(cartData:Cart)
  {
    let res;
    if(cartData.id_kupca!=undefined)
{
    res= this.http.post<Cart>('http://localhost:5000/api/Main/insertKorpa', cartData);}
else{
  cartData.id_kupca=0;
  res= this.http.post<Cart>('http://localhost:5000/api/Main/insertKorpa', cartData);
}
   return res;
  }

  addToWishList(wishData:ListaZelja)
  {
    let res;
    if(wishData.id_kupca!=undefined)
{
    res= this.http.post<ListaZelja>('http://localhost:5000/api/Main/insertListaZelja', wishData);}
else{
  wishData.id_kupca=0;
  res= this.http.post<ListaZelja>('http://localhost:5000/api/Main/insertListaZelja', wishData);
}
   return res;
  }

  getCartList(userId: number) {
    return this.http.get<Cart[]>('http://localhost:5000/api/Main/getKorpa/'+userId ,{
      observe:'response'
    }).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body); //emituje sve sto dobije iz linka
      }
    } );
  }
  getCartListCheck(userId: number) {
    return this.http.get<Cart[]>('http://localhost:5000/api/Main/getKorpa/'+userId );
  }

  getWishList(userId: number) {
    return this.http.get<ListaZelja[]>('http://localhost:5000/api/Main/getListaZelja/'+userId ,{
      observe:'response'
    }).subscribe((result)=>{
      console.warn(result);
      if(result && result.body){
        this.wishData.emit(result.body);
      }
    } );
  }

  removeItemFromCart(prid:number){
  let cartData=localStorage.getItem('localCart');
if(cartData)
{
  let items:VockaVrsta[]=JSON.parse(cartData);
  items = items.filter((vocka:VockaVrsta)=>prid!==vocka.id)
localStorage.setItem('localCart',JSON.stringify(items));
this.cartData.emit(items);
}
}
removeItemFromWishList(prid:number){
  let wishData=localStorage.getItem('localWish');
if(wishData)
{
  let items:VockaVrsta[]=JSON.parse(wishData);
  items = items.filter((vocka:VockaVrsta)=>prid!==vocka.id)
localStorage.setItem('localWish',JSON.stringify(items));
this.wishData.emit(items);
}
}
searchProduct(query: string) {
  return this.http.get<VockaVrsta[]>(
    'http://localhost:5000/api/Main/getVockaVrsta/'+query);
}

remove()
{
  localStorage.removeItem('localCart');
  this.cartData.emit([]);  //emituje 0
}
removeWishList()
{
  localStorage.removeItem('localWish');
  this.wishData.emit([]);
}
  removeToCart(cartId:number)
  {
    let res;
    res = this.http.delete<Cart>('http://localhost:5000/api/Main/deleteKorpa/'+cartId);
    return res;
  }
  removeToWish(wishId:number)
  {
    let res;
    res = this.http.delete<ListaZelja>('http://localhost:5000/api/Main/deleteListaZelja/'+wishId);
    return res;
  }
  removeFromCart(cartId:number)
  {
    let res;
    res = this.http.delete<Cart>('http://localhost:5000/api/Main/deleteKorpaId/'+cartId);
    return res;
  }
  removeFromWish(wishId:number)
  {
    let res;
    res = this.http.delete<ListaZelja>('http://localhost:5000/api/Main/deleteListaZeljaId/'+wishId);
    return res
  }
  updateCart(cart:Cart)
  {
    return this.http.put<Cart>('http://localhost:5000/api/Main/updateKorpa',cart);
  }
  updateCartOrder(cart:Cart)
  {
    return this.http.put<Cart>('http://localhost:5000/api/Main/updateKorpaNarudzbina',cart);
  }
  updateCartQuantity(cart:Cart)
  {
    return this.http.put<Cart>('http://localhost:5000/api/Main/updateKorpaKolicina',cart);
  }
  updateCartIdUser(cart:Cart)
  {
    return this.http.put<Cart>('http://localhost:5000/api/Main/updateKorpaIdKupca',cart);
  }
 
  currentCart() {
   let data:number;
   let res:Observable<Cart[]>;
    if(localStorage.getItem('isLoggedIn')==='true')
    {
    let userStore = localStorage.getItem('token');
    data= userStore && JSON.parse(userStore).id;     
    res= this.http.get<Cart[]>('http://localhost:5000/api/Main/getKorpa/'+ data);
  }else if(localStorage.getItem('isLoggedInAdmin')==='true')
  {
  data= -1   
  res= this.http.get<Cart[]>('http://localhost:5000/api/Main/getKorpa/'+ data);
}
    else{
      data=0;
      res=this.http.get<Cart[]>('http://localhost:5000/api/Main/getKorpa/'+ data);
    }
return res;
  }

  currentWishCart() {
    let data:number;
    let res:Observable<ListaZelja[]>;
     if(localStorage.getItem('isLoggedIn')==='true')
     {
     let userStore = localStorage.getItem('token');
     data= userStore && JSON.parse(userStore).id;     
     res= this.http.get<ListaZelja[]>('http://localhost:5000/api/Main/getListaZelja/'+ data);
   }
     else{
       data=0;
       res=this.http.get<ListaZelja[]>('http://localhost:5000/api/Main/getListaZelja/'+ data);
     }
 return res;
   }

   deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:5000/api/Main/deleteKorpa/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }
  deleteWishItems(wishId: number) {
    return this.http.delete('http://localhost:5000/api/Main/deleteListaZelja/' + wishId).subscribe((result) => {
      this.wishData.emit([]);
    })
  }

  orderNow(data: Order) {
    return this.http.post('http://localhost:5000/api/Main/insertNarudzbina', data);

  }
  orderList() {
  
    let userData:number;
    if(localStorage.getItem('token')){
    let userStore = localStorage.getItem('token');
    userData= JSON.parse(userStore).id;
    }
    else if(localStorage.getItem('tokenAdmin')){
      
      userData= -1;
      }
    else 
    {
      userData=0;
    }
    return this.http.get<Order[]>('http://localhost:5000/api/Main/getNarudzbina/' + userData);
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:5000/api/Main/deleteNarudzbina/'+orderId)

  }
  updateOrder(order:Order){
    return this.http.put('http://localhost:5000/api/Main/updateNarudzbina',order)

  }

  deleteIznos(Id:number){
    return this.http.delete('http://localhost:5000/api/Main/deleteIznos/'+Id)

  }
}
