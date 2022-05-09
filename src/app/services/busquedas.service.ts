import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuarios.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

 

  constructor( private http: HttpClient) { }

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

  private transformarUsuarios( resultado: any[]): Usuario[]{
    return resultado.map(
      user =>  new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
    );
  }

  private transformarHospitales( resultado: any[]): Hospital[]{
    //no usa la instancia por qque la img ya la llamos en otra parte  en el caso de hospitales
    return resultado
  }

  private transformarMedicos( resultado: any[]): Medico[]{
    //no usa la instancia por qque la img ya la llamos en otra parte  en el caso de hospitales
    return resultado
  }


  busquedaGlobal(termino:string){

    const url = `${ base_url }/todo/${ termino }`;
      
    return this.http.get( url,this.headers );

  }


  buscar( 
    tipo:'usuarios'|'medicos'|'hospitales',
    termino:string
    ) {
      
    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
      
    return this.http.get<any[]>( url,this.headers )
                    .pipe(
                      map((resp:any) => {

                        switch (tipo) {

                          case 'usuarios':
                            return this.transformarUsuarios(resp.resultado)

                          case 'hospitales':
                            return this.transformarHospitales(resp.resultado)

                          case 'medicos':
                            return this.transformarMedicos(resp.resultado)
                                         
                          default:
                            return [];
                        }
                      })
                    )
                //para que regrese el areglo
            
  }



}
