import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!:Usuario;
  public imagenSubir!:File;

  constructor(private fb: FormBuilder,
              private usuarioServices:UsuarioService,
              private fileUploadServices: FileUploadService) {
      //hacemos referencia al servicio y que cambie la propiedad de ahi mismo      
      this.usuario = usuarioServices.usuario; 
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email:  [ this.usuario.email,[Validators.required, Validators.email]]
    });

  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioServices.actualizarPerfil( this.perfilForm.value)
                         .subscribe(resp => {
                           //actualiza los datos del emil y password de todos donde este conectado el servicio
                           const {nombre, email} = this.perfilForm.value;
                           this.usuario.nombre = nombre;
                           this.usuario.email = email;
                         })
  }

  cambiarImagen( event:any ){
    console.log();
    this.imagenSubir = event.target.files[0]
  }

  subirImagen(){
    this.fileUploadServices
        .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid! )
        .then(img => console.log(img))
  }

}
