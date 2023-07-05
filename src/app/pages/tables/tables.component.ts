import {Component, OnInit} from '@angular/core';
import {DataTableColumn} from '../models/tables';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  public columns: DataTableColumn[] = [
      { name: 'firstName', label: 'Nombre' },
      { name: 'lastName', label: 'Apellidos' },
      { name: 'login', label: 'Usuario' }
  ];
  editRows = true;
  constructor() { }

  ngOnInit() {
  }

}
