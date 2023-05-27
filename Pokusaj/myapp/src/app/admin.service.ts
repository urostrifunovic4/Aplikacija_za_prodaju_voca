import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Admin } from './models/admin';
import { Contact } from './models/contact';
import { FileToUpload } from './models/file-to-upload';
import { Kupon } from './models/kupon';
import { Ocena } from './models/ocena';
import { Iznos } from './models/price';
import { Vocka } from './models/vocka';
import { VockaVrsta } from './models/vockavrsta';
export {}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
 private API_URL="http://localhost:5000/api/Main/deleteVocka/";
 private httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};
ocenaData = new EventEmitter<Ocena[]|[]>();
fruitData = new EventEmitter<Vocka[]|[]>();
fruitTypeData = new EventEmitter<VockaVrsta[]|[]>();
  constructor(private http: HttpClient, private router:Router) { } 
  public getAllContact(): Observable<Contact[]>{

     return this.http.get<Contact[]>('http://localhost:5000/api/Main/getAllContact');
    
    }
    
    public insertContact(contact: Contact){
    return this.http.post<Contact>('http://localhost:5000/api/Main/insertContact', contact);
    }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
  public getAdmin(): Observable<Admin>{
      return this.http.get<Admin>('http://localhost:5000/api/Main/getAdmin')
      .pipe(
        catchError(this.handleError<Admin>('getAdmin'))
      );;
    }
        
    public uploadFile(theFile: FileToUpload):Observable<any> {
       return this.http.post<FileToUpload>('http://localhost:5000/api/Main/fileToUpload', theFile, this.httpOptions);
    }
    public getAllVoce(): Observable<Vocka[]>{
      return this.http.get<Vocka[]>('http://localhost:5000/api/Main/getAllVocka');
    }
    public getAllFruits(){
      return this.http.get<Vocka[]>('http://localhost:5000/api/Main/getAllVocka',{
        observe:'response'
      }).subscribe((result)=>{
        if(result && result.body){
          this.fruitData.emit(result.body);
        }
      } );
    }
    public insertVocka(vocka: Vocka): Observable<Vocka>{
      return this.http.post<Vocka>('http://localhost:5000/api/Main/insertVocka', vocka);
    }

    public updateVocka(vocka: Vocka): Observable<Vocka>{
      return this.http.put<Vocka>('http://localhost:5000/api/Main/updateVocka', vocka);
    }
    public deleteVocka(id?: number): Observable<Vocka>{
      return this.http.delete<Vocka>('http://localhost:5000/api/Main/deleteVocka/'+id);
    }
    public deleteStory(id: number): Observable<number>{
  
      return this.http.delete<number>(this.API_URL +id);
  
   }
    public deleteVocka2(vocka: Vocka, id?: number): Observable<Vocka>{
      return this.http.delete('http://localhost:5000/api/Main/deleteVocka/{id}='+id);
    }
    public deleteVockaVr(id?: number): Observable<VockaVrsta>{
      return this.http.delete<VockaVrsta>('http://localhost:5000/api/Main/deleteVockaVrsta/'+id);
    }
    public insertVockaVrsta(vockavrsta: VockaVrsta): Observable<VockaVrsta>{
      return this.http.post<VockaVrsta>('http://localhost:5000/api/Main/insertVockaVrsta', vockavrsta);
    }
    public updateVockaVrsta(vocka: VockaVrsta){
      return this.http.put<VockaVrsta>('http://localhost:5000/api/Main/updateVockaVrsta', vocka);
    }
    public getAllVockaVrsta() {
      return this.http.get<VockaVrsta[]>('http://localhost:5000/api/Main/getAllVockaVrsta');
    }
    public getAllTypeVockaVrsta(){
      return this.http.get<VockaVrsta[]>('http://localhost:5000/api/Main/getAllVockaVrsta',{
        observe:'response'
      }).subscribe((result)=>{
        if(result && result.body){
          this.fruitTypeData.emit(result.body);
        }
      } );
    }
    public getOneVockaVrsta(id: number): Observable<VockaVrsta>
    { return this.http.get<VockaVrsta>('http://localhost:5000/api/Main/getOneVockaVrsta/'+id);}

//ocene
    public insertOcena(ocena: Ocena): Observable<Ocena>{
      return this.http.post<Ocena>('http://localhost:5000/api/Main/insertOcena', ocena);
    }
    public getOcena(id:number){
      return this.http.get<Ocena[]>('http://localhost:5000/api/Main/getOcena/'+id,{
        observe:'response'
      }).subscribe((result)=>{
        if(result && result.body){
          this.ocenaData.emit(result.body);
        }
      } );
    }
    public getOcenaID(id:number){
      return this.http.get<Ocena[]>('http://localhost:5000/api/Main/getOcena/'+id);
    }
    public getOcene(){
      return this.http.get<Ocena[]>('http://localhost:5000/api/Main/getOcene');
    }

//kuponi
public insertKupon(kupon:Kupon): Observable<Ocena>{
  return this.http.post<Kupon>('http://localhost:5000/api/Main/insertKupon', kupon);
}
public getKuponi(){
  return this.http.get<Kupon[]>('http://localhost:5000/api/Main/getKuponi');
}
public insertIznos(iznos:Iznos): Observable<Iznos>{
  return this.http.post<Iznos>('http://localhost:5000/api/Main/insertIznos', iznos);
}
public getIznos(id:number){
  return this.http.get<Iznos>('http://localhost:5000/api/Main/getIznos/'+id);
}
public updateIznos(iznos: Iznos): Observable<Iznos>{
  return this.http.put<Iznos>('http://localhost:5000/api/Main/updateIznos', iznos);
}
public updateIznosKupon(iznos: Iznos): Observable<Iznos>{
  return this.http.put<Iznos>('http://localhost:5000/api/Main/updateIznosKupon', iznos);
}
logout() :void {    
  localStorage.setItem('isLoggedInAdmin','false');    
  localStorage.removeItem('tokenAdmin');
 }
}
