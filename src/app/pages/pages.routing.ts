import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';



const routes: Routes = [
    {
        path:'dashboard',
      component:PagesComponent,
      canActivate:[ AuthGuard ],
      //carghar los gards pero ne sesita una modificacion en la parte de los gards igual que es el candload 
      canLoad:[AuthGuard],
      loadChildren: () => import('./chil-routes.module').then(m => m.ChilRoutesModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
