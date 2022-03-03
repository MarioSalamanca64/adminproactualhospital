import { Component } from '@angular/core';
import { ChartData } from 'chart.js';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {
  
  public Labels1: string[] = [ 'Pan', 'Refresco', 'Tacos' ];
  public data1: ChartData<'doughnut'> = {
    labels: this.Labels1,
    datasets: [
      { 
      data: [ 10, 15, 40 ],
      } 
    ]
  };
    
  


}
