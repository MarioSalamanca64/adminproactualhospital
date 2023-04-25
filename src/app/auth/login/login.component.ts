import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2!:any;
  public document:any;


  public loginForm = this.fb.group({
    email:    [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private router:Router,
               private fb:UntypedFormBuilder,
               private usuarioServices:UsuarioService,
               private ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton()
  }

 
  login(){
    this.usuarioServices.login(this.loginForm.value)
    .subscribe( resp => {
      //recuerdame  
      if( this.loginForm.get('remember')?.value ){
        localStorage.setItem('email',this.loginForm.get('email')?.value )
      }else{
        localStorage.removeItem('email');
      }
      //navegacion a dashboard
      this.router.navigateByUrl('/')


    }, (err) => {
      //si hay algun error
      Swal.fire('Error',err.error.msg, 'error')
    })
    

  
  }
  //GOOGLE function
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  };

  async startApp() {

    await this.usuarioServices.gooogleInit();
    //factorizacion del servicio ----------->
    this.auth2 = this.usuarioServices.auth2;
     //id de boton ade google 
     this.attachSignin(document.getElementById('my-signin2'));
   
  };

  attachSignin(element:any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
       //tomar token
       console.log('google',googleUser)
       const id_token = googleUser.getAuthResponse().id_token;
       
       this.usuarioServices.loginGoogle(id_token)
                           .subscribe(resp => {
                             //navegar al dashboard
                             //ngzone es para reparar los enrutados por librerias de terceros
                             this.ngZone.run(()=>{
                             this.router.navigateByUrl('/')
                             })
                           });

      }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
