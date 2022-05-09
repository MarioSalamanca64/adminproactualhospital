import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate , CanLoad{
  constructor(private usuarioServices:UsuarioService,
              private router:Router){}
    //cand load debe siempre reegresar un true o un falce no carga si no esta autentificado
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.usuarioServices.validarToken()
    .pipe(
      tap( estaAutenticado => {
        if(!estaAutenticado){
          this.router.navigateByUrl('/login')
        }
      })
    );

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

     return this.usuarioServices.validarToken()
                                .pipe(
                                  tap( estaAutenticado => {
                                    if(!estaAutenticado){
                                      this.router.navigateByUrl('/login')
                                    }
                                  })
                                );
  }
  
}
