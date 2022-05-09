import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuarios.model';
import { Medico } from '../../models/medico.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[]   = []
  public medicos:Medico[]      = []
  public hospitales:Hospital[] = []


  constructor( private activateRouter:ActivatedRoute,
               private busquedasServices:BusquedasService ) { }

  ngOnInit(): void {

    this.activateRouter.params
                       .subscribe(({termino}) => {
                        this.busquedaGlobal(termino)
                       })

    console.log(this.usuarios)
  }

  busquedaGlobal(termino:string){

    this.busquedasServices.busquedaGlobal(termino)
                          .subscribe((resp:any) => {
                            this.usuarios   = resp.usuario;
                            console.log(resp)
                            this.medicos    = resp.medicos;
                            this.hospitales = resp.hospitales
                          })

  }

  abrirMedico(medico:Medico){
      
  }

}
