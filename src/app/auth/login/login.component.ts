import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
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


  public loginForm = this.fb.group({
    email:    [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private router:Router,
               private fb:FormBuilder,
               private usuarioServices:UsuarioService) { }
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

    }, (err) => {
      //si hay algun error
      Swal.fire('Error',err.error.msg, 'error')
    })
    //console.log( this.loginForm.value )

   //this.router.navigateByUrl('/')
  }
  onSuccess(googleUser:any) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }
  onFailure(error:any) {
    console.log(error);
  }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }

}
