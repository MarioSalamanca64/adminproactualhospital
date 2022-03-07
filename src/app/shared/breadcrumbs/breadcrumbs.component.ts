import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent  {
  
  public titulo!:string;

  constructor( private router:Router ) {
    this.getArgumentosRutas();
  }

   getArgumentosRutas(){
    //routers es de la libreria y toma como valores las rutas hijas que ya hicimos
    this.router.events.pipe(
      //instanceof debulbe verdadero en caso que lo tenga en este caso se usa para solo tener dos que cumplan con ActivationEnd
      filter( event => event instanceof ActivationEnd ),
      //segundo filto en este caso quieremos el firstchil que es null es el que pasara 
      filter( (event:any) => event.snapshot.firstChild ===  null),
      map(event => event.snapshot.data)
    ).subscribe(({ titulo }) => {
      //console.log(data); original sin la restruturacion data.titulo
      this.titulo = titulo
      //colocar titulo en la pagina parte de arriba seria si 
      document.title = `AdminPro - ${titulo}`
    });

   }


}
