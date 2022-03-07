import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervaloSubcrioption : Subscription;

  constructor() {

    //------primera parte
    // //a qui obtiene lo que esta en el obserbable
    // this.retornaObservable().pipe(
    //   //pipe trasforma como sale la informacion

    //   //retry reintenta hacer la coneccion con el obserbable asta que lo logra 
    //   //ometer paramatros de cuantas veces se intentara en esta caso son 2
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs:',valor),
    //   error => console.warn('Error',error),
    //   () => console.info('obserbable terminado')
    // );
    //-------segunda parte 
  this.intervaloSubcrioption =   this.retornaIntervalo()
        .subscribe( console.log )
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervaloSubcrioption.unsubscribe();
  }

  retornaIntervalo(){
    //interval pero biene de rxjs pasas el tiempo dentro dela funcion
    return  interval(500)
                       .pipe(                   
                         //take toma solo los valores que se mandan en el parametro osea que solo tomara 10
                         //take(10),
                         //map trasforma la informacion de salida o la muta ya que comiensa en 0 ahora comienza con 1
                         map(valor => 
                           //valor se resibe de el subcribe padre en este caso si ponemos hola mundo regresara un holla mundo 4 veces
                            valor + 1
                         ),
                         //valor seria producto del map filter seimpre regrsara un true o false
                         //filtra los numero en este caso si es un numero par o inpar
                         filter((valor:any) =>  valor % 2 === 0 ? true : false),
                       )
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>( observer => {

    const intervalo = setInterval( () => {
        i ++;
        //next tomara el sigiente valor
        observer.next(i);
        //llega solo a 4
        if( i === 4 ){
          //linpiamos el setInterval
          clearInterval(intervalo);
          //canselamos el obserber
          observer.complete();
        }
        //error termina el obserbable
        if(i === 2){
          console.log('i = 2.... error')
          observer.error('i llego al valor de 2')
        }
      },1000)
    });

    return obs$;

  }

}
