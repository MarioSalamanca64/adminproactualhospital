import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuarios.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: UntypedFormGroup;
  public usuario!:Usuario;
  public imagenSubir!:File;
  public imgTemp: any = null;

  constructor(private fb: UntypedFormBuilder,
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

                           Swal.fire('Guardado','Cambios fueron guardados','success');
                         }, (err) => {
                           Swal.fire('Error',err.error.msg,'error');
                           console.log()
                         });
  }

  cambiarImagen( file:any|undefined):any{
   const file2 = file.target.files[0]
    this.imagenSubir = file2
    //codigo para guardar temporal mente la img y saber si es la q qquiere el clinete inicio
    if(!file2){
      return this.imgTemp = '';
    }

    const reader = new FileReader();

    reader.readAsDataURL( file2 );

    reader.onloadend = () => {
       this.imgTemp = reader.result;
       console.log(reader.result);
     }
  //codigo para guardar temporal mente la img y saber si es la q qquiere el clinete end
  }

  subirImagen(){
    this.fileUploadServices
        .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid! )
        .then(img => {
          this.usuario.img = img
          Swal.fire('Guardado','Imagen de usuario actualizado','success');
        }).catch(err =>{
          Swal.fire('Error','No se puedo subir la imagen','error');
        })
  }

}
