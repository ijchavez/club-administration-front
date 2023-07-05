import {Component, OnInit} from '@angular/core';
import {DataTableColumn} from '../models/tables';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {CoreState} from '../../core/states/core.state';
import {PageModel} from '../../core/models/page.model';
import {ConfigModel} from '../../core/models/config-model';
import {MatDialog} from '@angular/material/dialog';
import {MemberModel} from '../../core/models/member.model';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {PartnerModel} from '../../core/models/partner.model';
import {DeletePartnerAction, PartnersListActions} from '../../core/actions/partners.actions';
import {PartnerCrudComponent} from '../partner-crud/partner-crud.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  @Select(CoreState.getPagePartner) categoryData$: Observable<PageModel<PartnerModel>>;
  public columns: DataTableColumn[] = [
      { name: 'name', label: 'Nombre' },
      { objectKey: 'categoryType', name: 'name', label: 'Tipo de categoría' },
      { name: 'active', label: 'Activo' }
  ];
  public data: MemberModel[] = [];
  config: ConfigModel;
  tittle = 'Socios';
  page: 0;
  constructor(private store: Store, public dialog: MatDialog, private translate: TranslateService) { }

  ngOnInit() {
    this.config = {
      details: true,
      update: true,
      filter: false,
      delete: true,
      isRowUpdate: true,
      itemsPerPage: 9
    };
    this.page =  0;
    this.store.dispatch(new PartnersListActions({page: this.page , size: this.config.itemsPerPage}));
  }

  onchangePage($event: any) {
    this.page = $event;
    this.listPartners();
  }

  private listPartners() {
    this.store.dispatch(new PartnersListActions({page: this.page, size: this.config.itemsPerPage}));
  }

  onUpdate($event: any) {
    this.openCategory($event);
  }

  private openCategory(updateData?: any) {
    const dialogRef = this.dialog.open(PartnerCrudComponent, {
      width: '750px',
      maxHeight: '750px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: updateData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listPartners();
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
        body: this.translate.instant('Are you sure to delete selected partner?'),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeletePartnerAction($event));
      }
    });
  }

  onDetails($event: any) {

  }
}
