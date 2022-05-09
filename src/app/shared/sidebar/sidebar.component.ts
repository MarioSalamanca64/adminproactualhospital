import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario!: Usuario;
  public menuItems!: any[];


  constructor(public sidebarServices:SidebarService,
              private usuarioServices:UsuarioService) { 
    //como es un get no se nesesita poner llaves forma antigua de traer el menu lateral
    //this.menuItems = sidebarServices.menu;
    //instacia del modelo
    //console.log('menu',this.usuario);
    this.usuario   = usuarioServices.usuario;
    
    
  }
  
  ngOnInit(): void {
    //muestra menu del sidebar
    this.menuItems = this.sidebarServices.menu
    
  }

}
