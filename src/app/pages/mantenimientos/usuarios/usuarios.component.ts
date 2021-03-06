import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit , OnDestroy{
  public totalUsuarios:number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!:Subscription;
  public desde:number = 0;
  public cargando:boolean = true;
  public usuario:string = '';

  constructor(private usuarioServices:UsuarioService,
              private busquedasService:BusquedasService,
              private modalImagenService:ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    //delay es parta uqe carge la imagen  yt es un valor que se emite desde otro componente es ques modal imagen
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    )
    .subscribe( img => this.cargarUsuarios() )
  }

  cargarUsuarios(){
    this.cargando = true;

      //toma los datos de una interfas 
      this.usuarioServices.cargarUsuarios(this.desde).subscribe( ({ total,usuarios }) => {
        this.totalUsuarios = total;
        if(usuarios.length !== 0){
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        }
    })
  }

  cambiarPagina( valor:number ){
    this.desde += valor

    if(this.desde < 0 ){
      this.desde = 0
    }else if (this.desde > this.totalUsuarios) {
      //hace el caso inverso del de ariba
      this.desde -= valor
    }
    this.cargarUsuarios();
  }

  buscar(termino:string):any{
    //para que si lo que le pases es igual asero sequede a qui y muestre los ususarios antiguos o los que biene por
    if(termino.length === 0){
     
      return  this.usuarios = this.usuariosTemp
    }
    
    this.busquedasService.buscar('usuarios',termino)
                          .subscribe((resultado:any) => {
                            this.usuarios = resultado
                          })
                    
  }

  eliminarUsuario(usuario:Usuario):any{


    if(usuario.uid === this.usuarioServices.uid){
      return Swal.fire('Error', 'No puede borrarse a si mismo no mame', 'error');
    }
    
    Swal.fire({
      title: 'Borrar ususario?',
      text: `Estas a punto de borrar a ${ usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'si, borrarlo'
    }).then((result) => {
      
      if (result.value) {
    
         this.usuarioServices.eliminarUsuario(usuario)
                            .subscribe( resp => {
                              this.cargarUsuarios();
                              Swal.fire(
                                'Usuario borrado',
                                `${usuario.nombre} fue eliminado correctamente`,
                                'success'
                                )
                            }
                                )
      }
    })
  }

  cambiarRole( usuario:Usuario ){
    this.usuarioServices.guardarUsuario(usuario)
                        .subscribe(resp =>{
                            console.log(resp)
                        })
  }

  abrirModal(usuario:any):void{
    this.modalImagenService.abrilModal('usuarios', usuario.uid, usuario.img);
  }

}
