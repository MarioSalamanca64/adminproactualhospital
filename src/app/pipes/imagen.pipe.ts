import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  //traforma la data para que se pueda mostrar la imagen los pipes no cambian la data solo visual mente 
  transform( img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    console.log('holamundo');
    if(!img){
      return `${base_url}/uploads/usuarios/no-imagen`;
    }
  
  //para el caso de imagenes de google
  else if(img?.includes('https')){
      //si tiene https si no se se siga este https es loque trae google la respuesta 
      return img;
      console.log(img)
  }
  //vers i tiene foto si no mandar el no imagen
  else if(img){
       return `${base_url}/uploads/${tipo}/${img}`
   }
   else{
       return `${base_url}/uploads/${tipo}/no-imagen`
   }
  }

}
