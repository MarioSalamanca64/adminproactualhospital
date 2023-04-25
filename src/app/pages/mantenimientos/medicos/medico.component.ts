import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: UntypedFormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: Hospital | any;

  constructor(private fb:UntypedFormBuilder,
              private hospitalService:HospitalService,
              private medicoService:MedicoService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
    //tomar todos los parametros que vengan en la imgUrl //sepone id por que el nombre tambien debe estar en la rutas 
    this.activatedRoute.params
                       .subscribe(({id}) => this.cargarMedico(id))


    


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital:['',Validators.required]
    });

    this.cargarHospitales();

    //subcrito a un angular forms
    this.medicoForm.get('hospital')?.valueChanges
                                    .subscribe( hospitalid => {
                                      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalid)
                                      console.log(this.hospitalSeleccionado)
                                    })

  }

  cargarMedico(id:string){

    if(id === 'nuevo'){
      return;
    }
 
     this.medicoService.obtenerMedicoPorId(id)
                       .pipe(
                         delay(100)
                       )
                       .subscribe( (medico:any):any => {

                        if(!medico){
                          return  this.router.navigateByUrl(`/dashboard/medico`)
                        }
                         console.log(medico)
                         const { nombre , hospital:{ _id } } = medico
                         console.log(nombre,_id)
                         this.medicoSeleccionado = medico;
                         this.medicoForm.setValue({nombre,hospital: _id})
                       })


  }

  cargarHospitales(){

    this.hospitalService.cargarHospitales()
                        .subscribe( (hospitales: Hospital[])  => {
                          this.hospitales = hospitales
                        })  

  }

  guardarMedico(){

    if(this.medicoSeleccionado){
      //actualizar medico 

      const {nombre} = this.medicoForm.value

      const data = {
        //por que ya lo tenemos en set value 
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
                        .subscribe(resp => {
                          console.log(resp)
                          Swal.fire('Actualizado', `${ nombre } Actualizado correctamente`,'success');
                        })

    }else{
      //crear medico
      const {nombre} = this.medicoForm.value
      this.medicoService.crearMedico(this.medicoForm.value)
                        .subscribe( (resp:any) => {
                          //console.log(resp);
                          Swal.fire('Creado', `${ nombre } Creado correctamente`,'success');
                          this.router.navigateByUrl(`/dashboard/medico/${resp.medicoDB._id}`)
                        })
    }



  }

}
