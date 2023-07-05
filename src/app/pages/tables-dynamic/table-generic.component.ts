import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataTableColumn} from '../models/tables';
import {PageModel} from '../../core/models/page.model';
import {ConfigModel} from '../../core/models/config-model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss']
})
export class TableGenericComponent implements OnInit {
  @Output() public changePage = new EventEmitter();
  @Output() public update = new EventEmitter();
  @Output() public details = new EventEmitter();
  @Output() public delete = new EventEmitter();
  @Output() public filter = new EventEmitter();
  @Output() public add = new EventEmitter();
  @Input() public columns: DataTableColumn[] = [];
  @Input() public page: PageModel<any> = new PageModel<any>();
  @Input() public data: any[] = [];
  @Input() public config: ConfigModel;
  @Input() public upd = true;
  @Input() public del = true;
  @Input() tittle: string;
  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  getPosition(i: number) {
    if (this.config.itemsPerPage - i > 2) {
      return 'bottom-right';
    }
    return 'top-right';
  }

  getHeightTable() {
    return 'height: ' + ((65 * this.config.itemsPerPage) + 40) + 'px';
  }

  counter(totalPages: number) {
    return new Array(totalPages);
  }

  onChangePage(i: number) {
    if (i !== this.page.number) {
      this.changePage.emit(i);
    }
  }

  onPrevPage() {
    this.changePage.emit(this.page.number - 1);
  }

  onNextPage() {
    this.changePage.emit(this.page.number + 1);
  }

  onUpdate(row: any) {
    this.update.emit(row);
  }

  onAdd() {
    this.add.emit();
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  getData(row: any, column: DataTableColumn) {
    if (column.objectKey){
      if (row[column.objectKey]) {
        return this.translate.instant('' + row[column.objectKey][column.name]);
      }
      return this.translate.instant('' + row[column.objectKey]);
    } else if (typeof column.format === 'function') {
      return this.translate.instant('' + column.format(row[column.name]));
    }

    return this.translate.instant('' + row[column.name]);
  }

  onDetails(row: any) {
    this.details.emit(row);
  }

  onFilter() {
    this.filter.emit();
  }
}
