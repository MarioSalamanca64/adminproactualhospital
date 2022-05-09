//interface
interface _HospitalUser{
    _id:string;
    nombre:string;
    img:string;
}

// _ significa q es algo qques es privado
//modelo 
export class Hospital {

    constructor(
        public nombre:string,
        public _id?:any,
        public img?:any,
        public usuario?:_HospitalUser,        
    ){

    }

}