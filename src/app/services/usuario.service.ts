import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, delay, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { Usuario } from '../models/usuarios.model';
import { CargarUsuario } from '../interfaces/cargar-ususarios.interface';

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
  //aqui podemos decir que que tipo de rol tiene para no dejarlo pasar alos que no son admin role 
  get role():'ADMIN_ROLE'|'USER_ROLE' | undefined {
    return this.usuario.role
  }

  get uid():string {
    return this.usuario.uid || '';
  }
  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
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

  guardarLocalStorage(token:string, menu:any){
        //quiobtenemos la informacion ates de que enttre al login
        localStorage.setItem('token', token);
        //creacion del menu en el local
        localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout(){
    localStorage.removeItem('token');

    //borrar menu
    localStorage.removeItem('menu');
    
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

      this.guardarLocalStorage(resp.token,resp.menu);
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
                      this.guardarLocalStorage(resp.token,resp.menu);       
                      }));
  }

  actualizarPerfil( data:{ email:string, nombre:string, role:any }){
    //hay que mandar tanbien el rol 
    //ladata es = a todo lo que tare la data + el rol
     data = {
       ...data,
       role: this.usuario.role
     };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)

  }

  login( formData: LoginForm ){
  
    return this.http.post(`${base_url}/login`,formData)
                    .pipe(
                       //tap es como sigiente paso 
                      tap( ( resp:any ) => {
                        this.guardarLocalStorage(resp.token,resp.menu);
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
                          this.guardarLocalStorage(resp.token,resp.menu);
                       }));
  }

  cargarUsuarios(desde: number = 0) {

    const url = `${base_url}/usuarios?desde=${desde}`;
    //muestra el total de usuarios  
    return this.http.get<CargarUsuario>(url,this.headers)
                    //este pipe se usa para motrsra las img de los avtares
                    .pipe(
                      //hace que demore 5 sec
                      delay(500),
                      map(resp => {
                        const usuarios = resp.usuarios.map(
                          //nueva instanacia para cambiar la data  tenemos un areglo de usuarios
                          user => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
                          );
                          
                        return {
                          total: resp.total,
                          usuarios
                        };
                      })
                    )
  }
  eliminarUsuario( usuario: Usuario ){

    //usuarios/6153d7a1ca7e2688ccdcf7a2
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url,this.headers);
  }

  guardarUsuario( usuario:Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)

  }
  

}
