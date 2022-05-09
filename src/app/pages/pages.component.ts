import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
//declarada de modo global y lo axepta ya que esta funcion esta en custom.js
declare function constomInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  

  constructor( private settingsService:SettingsService,
               private sidebarServices:SidebarService ) { }

  ngOnInit(): void {
    constomInitFunctions();
    this.sidebarServices.cargarMenu()
    console.log(this.sidebarServices.menu)
  }

}
