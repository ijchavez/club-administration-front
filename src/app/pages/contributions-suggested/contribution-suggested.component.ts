import {Component, OnInit} from '@angular/core';
import {DataTableColumn} from '../models/tables';
import {Select, Store} from '@ngxs/store';
import {CategoryTypeListActions} from '../../core/actions/category-type.actions';
import {Observable} from 'rxjs';
import {CategoryTypeModel} from '../../core/models/category-type.model';
import {CoreState} from '../../core/states/core.state';
import {PageModel} from '../../core/models/page.model';
import {ConfigModel} from '../../core/models/config-model';
import {MatDialog} from '@angular/material/dialog';
import {CategoryTypesCrudComponent} from '../category-types-crud/category-types-crud.component';
import {ContributionSuggestedModel} from '../../core/models/contribution-suggested.model';
import {ContributionSuggestedListActions, DeleteContributionSuggestedAction} from '../../core/actions/contribution-suggested.actions';
import {ContributionsSuggestedCrudComponent} from '../contributions-suggested-crud/contributions-suggested-crud.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-tables',
  templateUrl: './contribution-suggested.component.html',
  styleUrls: ['./contribution-suggested.component.scss']
})
export class ContributionSuggestedComponent implements OnInit {
  @Select(CoreState.getPageContributionSuggested) contributionsData$: Observable<PageModel<ContributionSuggestedModel>>;
  public columns: DataTableColumn[] = [
        {objectKey: 'categoryType', name: 'name', label: 'Tipo de categoría' },
      { name: 'paymentMethod', label: 'Método de pago' },
      { name: 'amount', label: 'Monto' }
  ];
  public data: ContributionSuggestedModel[] = [];
  config: ConfigModel;
  tittle = 'Tipos de contribuciones';
  page: 0;
  constructor(private store: Store, public dialog: MatDialog, public translateService: TranslateService) { }

  ngOnInit() {
    this.config = {
      update: true,
      delete: true,
      filter: false,
      isRowUpdate: true,
      itemsPerPage: 9
    };
    this.listContributions();
  }


  onchangePage($event: any) {
    this.page = $event;
    this.listContributions();
  }

  private listContributions() {
    this.store.dispatch(new ContributionSuggestedListActions({page: this.page, size: this.config.itemsPerPage}));
  }

  onUpdate($event: any) {
    this.openContribution($event);
  }

  private openContribution(updateData?: any) {
    const dialogRef = this.dialog.open(ContributionsSuggestedCrudComponent, {
      width: '650px',
      maxHeight: '450px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: updateData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listContributions();
      }
    });
  }

  onAdd() {
    this.openContribution();
  }

  onDelete($event: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('Attention'),
        body: this.translateService.instant('Are you sure to delete the contribution suggested?'),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteContributionSuggestedAction($event));
      }
    });
  }
}
