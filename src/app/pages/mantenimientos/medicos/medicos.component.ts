import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando:boolean = true;
  public medicos: Medico[] = [];  
  public imgSubs!: Subscription;

  constructor(private medicoService:MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedaServices:BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    )
    .subscribe( img => this.cargarMedicos() )

  }

  cargarMedicos (){
    this.cargando = true;
    this.medicoService.cargarMedicos()
                      .subscribe(medicos => {
                        this.cargando = false;
                        this.medicos = medicos;
                        console.log(medicos)
                      })
  }
  buscar(termino:string){
        //para que si lo que le pases es igual asero sequede a qui y muestre los ususarios antiguos o los que biene por
        if(termino.length === 0){
     
          return  this.cargarMedicos();
        }
        this.busquedaServices.buscar('medicos',termino)
                              .subscribe(resultado => {
                                this.medicos = resultado
                              })
                     

  }

  abrirModal(medico:Medico){

    this.modalImagenService.abrilModal('medicos', medico._id, medico.img);

  }

  borrarMedico(medico:Medico){

    Swal.fire({
      title: 'Borrar medico?',
      text: `Estas a punto de borrar a ${ medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'si, borrarlo'
    }).then((result) => {
      
      if (result.value) {
    
         this.medicoService.borrarMedicos(medico._id)
                            .subscribe( resp => {
                              this.cargarMedicos();
                              Swal.fire(
                                'Usuario borrado',
                                `${medico.nombre} fue eliminado correctamente`,
                                'success'
                                )
                            }
                                )
      }
    })
  }

}
