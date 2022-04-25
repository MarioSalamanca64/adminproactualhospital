import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrilModal(){
    this._ocultarModal = false ;
  }

  cerrarModal(){
    this._ocultarModal = true ;
  }


  constructor() { }
}
