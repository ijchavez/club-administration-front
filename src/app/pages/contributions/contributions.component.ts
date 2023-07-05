import {Component, OnInit} from '@angular/core';
import {DataTableColumn} from '../models/tables';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {CoreState} from '../../core/states/core.state';
import {PageModel} from '../../core/models/page.model';
import {ConfigModel} from '../../core/models/config-model';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ContributionsModel} from '../../core/models/contributions.model';
import {ContributionsListsActions, DeleteContributionsAction} from '../../core/actions/contributions.actions';
import {ContributionsCrudComponent} from '../contributions-crud/contributions-crud.component';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {
  @Select(CoreState.getPageContributions) contributions$: Observable<PageModel<ContributionsModel>>;
  public columns: DataTableColumn[] = [
      { objectKey: 'partner', name: 'name', label: 'Socio' },
      { name: 'paymentMethod', label: 'Método de pago' },
      { name: 'date', format: (v) => moment(v).format('DD/MM/YYYY'), label: 'Fecha' },
      { name: 'amount', label: 'Monto' }
  ];
  public data: ContributionsModel[] = [];
  config: ConfigModel;
  tittle = 'Contribuciones';
  page = 0;
  constructor(private store: Store, public dialog: MatDialog, private translate: TranslateService) { }

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
    this.store.dispatch(new ContributionsListsActions({page: this.page, size: this.config.itemsPerPage}));
  }

  onUpdate($event: any) {
    this.openContribution($event);
  }

  private openContribution(updateData?: any) {
    const dialogRef = this.dialog.open(ContributionsCrudComponent, {
      width: '650px',
      maxHeight: '550px',
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
        title: this.translate.instant('Attention'),
        body: this.translate.instant('Are you sure to delete the contribution suggested?'),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteContributionsAction($event));
      }
    });
  }
}
