import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
//declarada de modo global y lo axepta ya que esta funcion esta en custom.js
declare function constomInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  

  constructor( private settingsService:SettingsService ) { }

  ngOnInit(): void {
    constomInitFunctions();
  }

}
