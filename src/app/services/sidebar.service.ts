import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//modelo del menu 
export class SidebarService {

  menuparse:any;
  menu = [] ;

  cargarMenu(){
    
    this.menuparse  = localStorage.getItem('menu')
    
    this.menu = JSON.parse(this.menuparse) || [];

  }


  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono:  'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Main', url: '/'},
  //       {titulo: 'ProgressBar', url: 'progress'},
  //       {titulo: 'Graficas', url: 'grafica1'},
  //       {titulo: 'promesas', url: 'promesas'},
  //       {titulo: 'rxjs', url: 'rxjs'},

  //     ]
  //   },
  //   {
  //     titulo: 'Dashboard',
  //     icono:  'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: 'usuarios'},
  //       {titulo: 'hospitales', url: 'hospitales'},
  //       {titulo: 'Medicos', url: 'medicos'},

  //     ]
  //   },
  // ];

}
