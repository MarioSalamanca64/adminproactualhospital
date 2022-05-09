import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
//componentes
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [{provide:LocationStrategy,useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
