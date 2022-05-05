import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
  constructor(private http: HttpClient) { }
  
    get token () {
      return localStorage.getItem('token') || '';
    }
  
    get headers(){
      return {
        headers:{
          'x-token': this.token
        }
      }
    }
    
    cargarHospitales() {

      const url = `${base_url}/hospitales`;
      //muestra el total de usuarios  
      return this.http.get(url,this.headers)
                       .pipe(
                         map((resp:any) => resp.hospitales)
                       );              
    } 

    crearHospital( nombre:string ) {

      const url = `${base_url}/hospitales`;
      //muestra el total de usuarios  
      return this.http.post(url,{nombre},this.headers);                      
    } 
  
    actualizarHospital( _id:string,nombre:string ) {

      const url = `${base_url}/hospitales/${_id}`;
      //muestra el total de usuarios  
      return this.http.put(url,{nombre},this.headers);
    } 

    borrarHospital( _id:string) {

      const url = `${base_url}/hospitales/${_id}`;
      //muestra el total de usuarios  
      return this.http.delete(url,this.headers);
    } 
}
