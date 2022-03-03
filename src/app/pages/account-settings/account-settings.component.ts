import { Component, OnInit } from '@angular/core';
import {DOCUMENT} from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  //toma el elemento del html index
  //public elemento =  document.querySelector('#theme');
  

  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  changeTheme(theme:string){

  this.settingsService.changeTheme(theme);



  }




}
