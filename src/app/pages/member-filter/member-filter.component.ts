import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {CategoryTypeListRootsActions} from '../../core/actions/category-type.actions';
import {CoreState} from '../../core/states/core.state';
import {Observable} from 'rxjs';
import {CategoryTypeModel} from '../../core/models/category-type.model';
import {MemberFilterModel} from '../../core/models/member-filter.model';

@Component({
  selector: 'app-member-filter',
  templateUrl: './member-filter.component.html',
  styleUrls: ['./member-filter.component.scss']
})
export class MemberFilterComponent implements OnInit {
  @Select(CoreState.getPageCategoriesRoots) categoriesRoots$: Observable<CategoryTypeModel[]>;
  @Select(CoreState.getSubCategories) subCategories$: Observable<CategoryTypeModel[]>;
  public subCategories: CategoryTypeModel[];
  @Select(CoreState.getMemberUpdated) memberUpdated$: Observable<boolean>;
  tittle = 'Filtrar miembro';

  onClose() {
    this.dialogRef.close();
  }

  constructor(private store: Store,
              private dialogRef: MatDialogRef<MemberFilterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MemberFilterModel) {
  }

  ngOnInit(): void {
    this.store.dispatch(new CategoryTypeListRootsActions());
  }
  onFilter() {
    this.dialogRef.close(this.data);
  }
}
