import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  //primera forma
  //public imgUrl = '';
  public usuario!: Usuario;


  constructor(private usuarioServices: UsuarioService,
              private router:Router ) {
    //como es un get no se nesesita poner llaves 
    //primera oforma
    //this.imgUrl = usuarioServices.usuario.imagenUrl 

    this.usuario   = usuarioServices.usuario;
  }
 

  logout(){
    this.usuarioServices.logout();
  }

  buscar(termino:string){

    if(termino.length === 0){
      return;
    }

    console.log('headercoponent termino',termino)
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }


}
