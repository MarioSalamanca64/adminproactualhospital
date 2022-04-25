import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir!:File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,
              public fileUploadServices:FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;


    this.fileUploadServices
        .actualizarFoto(this.imagenSubir, tipo, id )
        .then(img => {
          Swal.fire('Guardado','Imagen de usuario actualizado','success');
          //emite de a otro componente
          this.modalImagenService.nuevaImagen.emit(img)

          this.cerrarModal();
        }).catch(err =>{
          Swal.fire('Error','No se puedo subir la imagen','error');
        })
  }

}
