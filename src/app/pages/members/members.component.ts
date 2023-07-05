import {Component, OnInit} from '@angular/core';
import {DataTableColumn} from '../models/tables';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {CoreState} from '../../core/states/core.state';
import {PageModel} from '../../core/models/page.model';
import {ConfigModel} from '../../core/models/config-model';
import {MatDialog} from '@angular/material/dialog';
import {MemberModel} from '../../core/models/member.model';
import {DeleteMembersAction, MembersListActions} from '../../core/actions/members.actions';
import {MemberCrudComponent} from '../member-crud/member-crud.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DeleteContributionSuggestedAction} from '../../core/actions/contribution-suggested.actions';
import {MemberFilterComponent} from '../member-filter/member-filter.component';
import {MemberFilterModel} from '../../core/models/member-filter.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  @Select(CoreState.getPageMember) categoryData$: Observable<PageModel<MemberModel>>;
  public columns: DataTableColumn[] = [
      { name: 'firstName', label: 'Nombre' },
      { name: 'lastName', label: 'Apellido' },
      { name: 'document', label: 'Documento' },
      { name: 'active', label: 'Activo' }
  ];
  public data: MemberModel[] = [];
  config: ConfigModel;
  tittle = 'Miembros';
  page: 0;
  memberFilter: MemberFilterModel;
  constructor(private store: Store, public dialog: MatDialog, private translate: TranslateService) { }

  ngOnInit() {
    this.config = {
      update: true,
      delete: true,
      filter: true,
      isRowUpdate: true,
      itemsPerPage: 9
    };
    this.memberFilter = new MemberFilterModel();
    this.page =  0;
    this.store.dispatch(new MembersListActions({page: this.page , size: this.config.itemsPerPage, filter: this.memberFilter}));
  }

  onchangePage($event: any) {
    this.page = $event;
    this.listMembers();
  }

  private listMembers() {
    this.store.dispatch(new MembersListActions({page: this.page, size: this.config.itemsPerPage, filter: this.memberFilter}));
  }

  onUpdate($event: any) {
    this.openCategory($event);
  }

  private openCategory(updateData?: any) {
    const dialogRef = this.dialog.open(MemberCrudComponent, {
      width: '750px',
      maxHeight: '550px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: updateData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listMembers();
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
        body: this.translate.instant('Are you sure to delete selected member?'),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteMembersAction($event));
      }
    });
  }

  onFilter($event: any) {
    const dialogRef = this.dialog.open(MemberFilterComponent, {
      width: '400px',
      maxHeight: '550px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: this.memberFilter
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.memberFilter = result;
        this.listMembers();
      }
    });
  }
}
