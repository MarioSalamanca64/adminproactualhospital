import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//modulos
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
  //path : '/dashboard' PagesRouting
  //path:  '/auth'      AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    //rutas hijas sin lazyload
    PagesRoutingModule,
    AuthRoutingModule
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
