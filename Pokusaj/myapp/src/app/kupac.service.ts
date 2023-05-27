import { HttpClient } from '@angular/common/http';
import { delay, Observable, tap } from 'rxjs';
import { Address } from './models/address';
import { Kupac } from './models/kupac';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KupacService {
  userData = new EventEmitter<Kupac[]|[]>();
  constructor(private http: HttpClient) { } 

  public getAllKupac(): Observable<Kupac[]>{
    return this.http.get<Kupac[]>('http://localhost:5000/api/Main/getAllKupac')
  }

  public getAddress(id:number){
    return this.http.get<Address>('http://localhost:5000/api/Main/getAddress/'+id);
  }
  public updateAddress(address:Address){
    return this.http.put<Address>('http://localhost:5000/api/Main/updateAddress',address);
  }
  public insertAddress(address:Address){
    return this.http.post<Address>('http://localhost:5000/api/Main/insertAddress',address);
  }
  public deleteKupac(id:number){
    return this.http.delete('http://localhost:5000/api/Main/deleteKupac/'+ id);
  }
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');
   }
  public insertKupac(kupac: Kupac): Observable<Kupac>{
    return this.http.post<Kupac>('http://localhost:5000/api/Main/insertKupac', kupac);
  }
  public getKupac(id:number): Observable<Kupac>{
    return this.http.get<Kupac>('http://localhost:5000/api/Main/getKupac/'+id);
  }
  public updateKupac(kupac: Kupac): Observable<Kupac>{
    if(!kupac.lozinka)
    {
    kupac.lozinka="0";
    }
    let user=localStorage.getItem('token')
    let userId = JSON.parse(user).id;
    kupac.id=userId;
    
    return this.http.put<Kupac>('http://localhost:5000/api/Main/updateKupac', kupac);
  }
}
