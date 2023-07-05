import {Component, OnInit} from '@angular/core';
import {DataTableColumn} from '../models/tables';
import {Select, Store} from '@ngxs/store';
import {CategoryTypeListActions, DeleteCategoryTypeAction} from '../../core/actions/category-type.actions';
import {Observable} from 'rxjs';
import {CategoryTypeModel} from '../../core/models/category-type.model';
import {CoreState} from '../../core/states/core.state';
import {PageModel} from '../../core/models/page.model';
import {ConfigModel} from '../../core/models/config-model';
import {MatDialog} from '@angular/material/dialog';
import {CategoryTypesCrudComponent} from '../category-types-crud/category-types-crud.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-tables',
  templateUrl: './category-types.component.html',
  styleUrls: ['./category-types.component.scss']
})
export class CategoryTypesComponent implements OnInit {
  @Select(CoreState.getPageCategory) categoryData$: Observable<PageModel<CategoryTypeModel>>;
  public columns: DataTableColumn[] = [
      { name: 'name', label: 'Nombre' },
      { name: 'parentName', label: 'Categoria Padre' }
  ];
  public data: CategoryTypeModel[] = [];
  config: ConfigModel;
  tittle = 'Tipos de categorías';
  page: 0;
  constructor(private store: Store, public dialog: MatDialog, private translate: TranslateService) { }

  ngOnInit() {
    this.config = {
      update: true,
      delete: true,
      filter: false,
      isRowUpdate: true,
      itemsPerPage: 9
    };
    this.store.dispatch(new CategoryTypeListActions({page: this.page , size: this.config.itemsPerPage}));
  }

  onchangePage($event: any) {
    this.page = $event;
    this.listCategories();
  }

  private listCategories() {
    this.store.dispatch(new CategoryTypeListActions({page: this.page, size: this.config.itemsPerPage}));
  }

  onUpdate($event: any) {
    this.openCategory($event);
  }

  private openCategory(updateData?: any) {
    const dialogRef = this.dialog.open(CategoryTypesCrudComponent, {
      width: '650px',
      maxHeight: '450px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: updateData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listCategories();
      }
    });
  }

  onAdd() {
    this.openCategory();
  }

  onDelete($event: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translate.instant('Attention'),
        body: this.translate.instant('Are you sure to delete the category type?'),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteCategoryTypeAction($event));
      }
    });
  }
}
