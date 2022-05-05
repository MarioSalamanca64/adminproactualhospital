import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit ,OnDestroy {

  public hospitales:any[] = [];
  public cargando:boolean = true;
  public imgSubs!: Subscription;


  constructor(private hospitalService:HospitalService, 
              private modalImagenService: ModalImagenService,
              private busquedasService:BusquedasService ) { }
  ngOnDestroy(): void {
   this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    )
    .subscribe( img => this.cargarHospitales() )
    console.log('hospitales',this.hospitales)
  }

  buscar(termino:string):any{
    //para que si lo que le pases es igual asero sequede a qui y muestre los ususarios antiguos o los que biene por
    if(termino.length === 0){
     
      return  this.cargarHospitales();
    }
    this.busquedasService.buscar('hospitales',termino)
                          .subscribe(resultado => {
                            this.hospitales = resultado
                          })
                    
  }


  cargarHospitales(){
    this.cargando = true;

    this.hospitalService.cargarHospitales()
                        .subscribe( (hospitales:any) => {
                          this.cargando= false 
                          this.hospitales = hospitales;
                        
                          console.log(hospitales)
                        })
  }

  guardarCambios(hospital:Hospital){
    
    this.hospitalService.actualizarHospital( hospital._id,hospital.nombre)
                        .subscribe(resp => {
                          Swal.fire('Actualizado',hospital.nombre, 'success')
                        });
  }

  eliminarHospital(hospital:Hospital){
    
    this.hospitalService.borrarHospital( hospital._id)
                        .subscribe(resp => {
                          this.cargarHospitales();
                          Swal.fire('Borrado',hospital.nombre, 'success')
                        });
  }

  async abrirSweetAlert(){

    const  {value = ''} = await Swal.fire<any>({
      title: 'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })
    if( value.trim().length > 0){
        this.hospitalService.crearHospital(value)
        .subscribe( (resp:any) => {
          this.hospitales.push(resp.hospital)
        })
    }
  }

  abrirModal(hospital:Hospital){

    this.modalImagenService.abrilModal('hospitales', hospital._id, hospital.img);

  }


}
