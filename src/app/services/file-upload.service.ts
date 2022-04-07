import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }
  //forma en javascript
  async actualizarFoto(
    archivo:File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id:string
  ){
      try {

        const url = `${base_url}/uploads/${tipo}/${id}`;
        const formData = new FormData();
        //append manda el archivo 
        formData.append('imagen',archivo);

        const resp = await fetch(url, {
          method:'PUT',
          headers:{
            'x-token': localStorage.getItem('token') || ''
          },
          body: formData
        });
      const data = await resp.json();
        //si tiene el nombre del archivo regrese true
        if( data.ok ){
          return data.nombreArchivo;
        }else{
          console.log(data.msg);
          return false
        }
        
      } catch (error) {
        console.log(error);
        return false;
      }
  }



}
