import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { Usuario } from '../models/usuarios.model';

const base_url = environment.base_url;
declare const gapi:any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  public auth2:any;
  public usuario!:Usuario;
  public img = '';

  constructor(private http:HttpClient,
              private router:Router,
              private ngZone:NgZone) {
                this.gooogleInit();
               }
  get token () {
    return localStorage.getItem('token') || '';
  }
  get uid():string {
    return this.usuario.uid || '';
  }

  gooogleInit(){
    //las promesas siempre se ejecutaran 
    return new Promise<void>(resolve => {
      console.log('google Init')
      gapi.load('auth2', () =>{
        //auth----------------------------------------------------
        this.auth2 = gapi.auth2.init({
          client_id: '811144765483-71fb07t5lm7hep4f9ohq12ko1gh4n2il.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }             

  logout(){
    localStorage.removeItem('token');
    
    //this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then(() => {
      this.ngZone.run(() =>{
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken():Observable<boolean>{
    //ver si token si exite si no manda vacio 
    //const  token = localStorage.getItem('token') || '';

    //actualiza el token 
    return this.http.get(`${base_url}/login/renew`, {
      headers:{
        'x-token': this.token
      }
    }).pipe(
      map((resp:any)=>{
      console.log('resp',resp);
      const {
        email,
        google,
        img,
        nombre,
        role,
        uid,
      } = resp.usuario
      //<-------------------------------------------------------------->
      //crear una instacia para porder ver las funciones dentro dle modelo 
      this.usuario = new Usuario(nombre,email,'',img,google,role,uid);
      //nota esto se usa para prubas--------------------------
      this.usuario.imprimirUsuario();

      //quiobtenemos la informacion ates de que enttre al login
      localStorage.setItem('token', resp.token);
      return true;
      }),
      //map trasforma a booleano y manda un true si trae la informacion del token 
      // map(resp => true),
      //cacha el error of regresa un boolean ya que mandaba error 
      catchError( error => {
        console.log(error)
        return of(false);
      })
    );


  }

  crearUsuario( formData: RegisterForm ){
    //formadata es la data que se manda 
    return this.http.post(`${base_url}/usuarios`,formData)
                    .pipe(
                      //tap es como sigiente paso 
                     tap( ( resp:any ) => {
                          localStorage.setItem('token', resp.token)
                          
                      }));
  }

  actualizarPerfil( data:{ email:string, nombre:string, role:any }){
    //hay que mandar tanbien el rol 
    //ladata es = a todo lo que tare la data + el rol
    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers:{
        'x-token': this.token
      }
    } )

  }

  login( formData: LoginForm ){
  
    return this.http.post(`${base_url}/login`,formData)
                    .pipe(
                       //tap es como sigiente paso 
                      tap( ( resp:any ) => {
                           localStorage.setItem('token', resp.token)
                       }));

  }

  loginGoogle( token:any ){
    console.log('tokennnnn',token)
    //destruturacion por que token es un objeto 
    return this.http.post(`${base_url}/login/google`, {token})
                    .pipe( 
                       //tap es como sigiente paso 
                      tap( ( resp:any ) => {
                          console.log(resp)
                           localStorage.setItem('token', resp.token)
                       }));

  }
  

}
