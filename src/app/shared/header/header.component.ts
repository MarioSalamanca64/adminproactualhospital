import { Component } from '@angular/core';
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


  constructor(private usuarioServices: UsuarioService) {
    //como es un get no se nesesita poner llaves 
    //primera oforma
    //this.imgUrl = usuarioServices.usuario.imagenUrl 

    this.usuario   = usuarioServices.usuario;
  }
 

  logout(){
    this.usuarioServices.logout();
  }


}
