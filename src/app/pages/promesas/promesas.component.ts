import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios)
    })

    // const promesa = new Promise( ( resolve,reject ) => {

    //   if(false){
    //     resolve('hola mundo');
    //   }else{
    //     reject('algo salio mal');
    //   }
    // });
    // //cath sige des pues del then para cahar el error
    // promesa.then( (mensaje) => {
    //   console.log(mensaje);
    // }).catch(error => console.log('Error en mi promesa', error))
    // console.log('fin del init')
  }
  getUsuarios(){

    return new Promise( resolve => {
      //cuando tengas la resolucion de esto manda la resp
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });
   

    // const promesa = new Promise( resolve =>{
    //   //cuando tengas la resolucion de esto manda la resp
    //   fetch('https://reqres.in/api/users')
    //     .then(resp => resp.json())
    //     .then(body => resolve(body.data));
    // });
    // return promesa

  }
}
