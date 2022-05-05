import { Hospital } from "./hospital.model";

//interface
interface _MedicoUser{
    _id:string;
    nombre:string;
    img:string;
}

// _ significa q es algo qques es privado
//modelo 
export class Medico {

    constructor(
        public nombre:string,
        public _id?:any,
        public img?:any,
        public usuario?:_MedicoUser,
        public hospital?: Hospital       
    ){

    }

}