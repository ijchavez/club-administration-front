import {Component, OnInit} from '@angular/core';

// core components

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];
  view2: any[] = [350, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    const single = [
      {
        name: 'Enero',
        value: 8940000
      },
      {
        "name": "Febrero",
        "value": 5000000
      },
      {
        "name": "Marzo",
        "value": 7200000
      },
      {
        "name": "Abril",
        "value": 7200000
      },
      {
        "name": "Mayo",
        "value": 7200000
      },
      {
        "name": "Junio",
        "value": 7200000
      },
      {
        "name": "Julio",
        "value": 7200000
      },
      {
        "name": "Agosto",
        "value": 7200000
      },
      {
        "name": "Septiembre",
        "value": 7200000
      },
      {
        "name": "Octubre",
        "value": 7200000
      },
      {
        "name": "Noviembre",
        "value": 7200000
      },
      {
        "name": "Diciembre",
        "value": 7200000
      }
    ];
    Object.assign(this, { single });
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }
}
