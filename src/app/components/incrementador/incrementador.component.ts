import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  ngOnInit() {
    //para no poner btn en frente 
    this.btnClass = `btn ${this.btnClass}`
  }
  //la mandas datos al input
  @Input()  progreso :number = 40;
  //cambiar color de botones
  @Input()  btnClass :string = 'btn-primary';
  //mandas datos ala barra de los bottomClosenes
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  

  cambiarValor(valor:number):any{

    if( this.progreso >= 100 && valor >= 0 ){
      //valor que manda al padre
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if( this.progreso <= 0 && valor < 0 ){
      //valor que manda al padre
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    //valor actual del progreso
    this.valorSalida.emit(this.progreso);
  }
  onChange(nuevoValor:number){
    //el evento resive lo que mandesy siempre esta al pendiente
    //console.log(valor);
    if(nuevoValor >= 100){
      this.progreso = 100;
    }else if (nuevoValor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }
}
