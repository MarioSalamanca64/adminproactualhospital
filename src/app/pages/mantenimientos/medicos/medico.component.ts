import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: Hospital | any;

  constructor(private fb:FormBuilder,
              private hospitalService:HospitalService,
              private medicoService:MedicoService,
              private router:Router) { }

  ngOnInit(): void {

    this.cargarHospitales();
    
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital:['',Validators.required]
    });
    //subcrito a un angular forms
    this.medicoForm.get('hospital')?.valueChanges
                                    .subscribe( hospitalid => {
                                      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalid)
                                      console.log(this.hospitalSeleccionado)
                                    })

  }

  cargarHospitales(){

    this.hospitalService.cargarHospitales()
                        .subscribe( (hospitales: Hospital[])  => {
                          this.hospitales = hospitales
                        })  

  }

  guardarMedico(){
    const {nombre} = this.medicoForm.value
    this.medicoService.crearMedico(this.medicoForm.value)
                      .subscribe( (resp:any) => {
                        Swal.fire('Creado', `${ nombre } Creado correctamente`,'success');
                        this.router.navigateByUrl(`/dashboard/medico/${resp.medicoDB._id}`)
                      })

  }

}
