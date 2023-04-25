import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['resgister.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;


  public registerForm = this.fb.group({
    nombre:   ['Fernando', [ Validators.required, Validators.minLength(3) ] ],
    email:    ['test100@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['123456', Validators.required ],
    password2:['123456', Validators.required ],
    terminos: [true, [Validators.required,Validators.requiredTrue]],
  }, {
     validators: this.passwordsIguales('password','password2'),
  });


  constructor(private fb: UntypedFormBuilder,
              private usuariosServices:UsuarioService,
              private router:Router) { }

  crearUsuario(){
    //conesto podemos saber si sise mando al informacion o no 
    this.formSubmitted = true

    console.log( this.registerForm.value );

    if(this.registerForm.invalid){
      return;
    }
    //Realizar el posteo
    this.usuariosServices.crearUsuario( this.registerForm.value )
      .subscribe(resp => {
       //navegar al dashboard
       this.router.navigateByUrl('/')
      }, (err) => {
        //Si sucede un error 
        Swal.fire('Error',err.error.msg, 'error');
      } );
  }

  campoNoValido( campo:string ):boolean{
    //desimos si el campo es invalido o el campo a sido tocado
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true 
    }else {
      return false
    }
  }
  contrasenasNoValidas():any{
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    //true siempre lo mastrara false siempre lo cultara
    if( (pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }
  //reutilizable
  passwordsIguales( pass1Name: string, pass2Name: string ):any{

    return ( formGroup: UntypedFormGroup ) => {
      //para desir que si son iguales pase si no no 
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control?.value === pass2Control?.value ){
        //false ni lo muestres 
          pass2Control?.setErrors(null)
      }else{
        //true muestre el erro 
        pass2Control?.setErrors({ noEsIgual:true })
      }


    } 

  }

 
}
