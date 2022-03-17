import { environment } from "src/environments/environment";

const base_url = environment.base_url;


export class Usuario{

    constructor(
       public nombre :string,
       public email :string,
       public password:string,
       public img?:string,
       public google?:boolean,
       public role?:string,
       public uid?:string,
    ){}
    imprimirUsuario(){
        console.log(this.img);
    }
    get imagenUrl() {
        
        //para el caso de imagenes de google
        if(this.img?.includes('https')){
            //si tiene https si no se se siga este https es loque trae google la respuesta 
            return this.img;
            console.log(this.img)
        }
        //vers i tiene foto si no mandar el no imagen
         if(this.img){
             return `${base_url}/uploads/usuarios/${this.img}`
         }
         else{
             return `${base_url}/uploads/usuarios/no-imagen`
         }
    }
    
}