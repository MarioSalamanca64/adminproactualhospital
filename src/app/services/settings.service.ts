import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //esto estaba en pages 
  private elemento =  document.querySelector('#theme');
  //esto estaba en pages 


  constructor() {
    //esto estaba en pages 
    const url:any = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.elemento?.setAttribute('href',url);
    //esto estaba en pages 

   }

   changeTheme(theme:string){
    //refrerencoa al html index principal
  //<link href="./assets/css/colors/blue-dark.css" id="theme" rel="stylesheet">
  const url = `./assets/css/colors/${theme}.css`;
  
  this.elemento?.setAttribute('href',url);
  localStorage.setItem('theme',url);

  this.checkCurrentTheme()
  
  }

  checkCurrentTheme(){

    const links = document.querySelectorAll('.selector');

    links.forEach((elementos:any) => {
    //remover la palomita cuando se use
    elementos.classList.remove('working');
    //tomar el elemento o la clase 
    const btnTheme = elementos.getAttribute('data-theme');
    //crear la url de donde esta guardado 
    const btnThemeUrl =  `./assets/css/colors/${btnTheme}.css`;
    //sacar la url para lograr comparar
    const currentTheme = this.elemento?.getAttribute('href');

    if(btnThemeUrl === currentTheme){
      elementos.classList.add('working');
    }

  })
}
}
