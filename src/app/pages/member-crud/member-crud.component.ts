import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {CategoryTypeListRootsActions, SubCategoryTypeByCategoryIdActions} from '../../core/actions/category-type.actions';
import {CoreState} from '../../core/states/core.state';
import {Observable, Subscription} from 'rxjs';
import {CategoryTypeModel} from '../../core/models/category-type.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemberModel} from '../../core/models/member.model';
import {AddMembersAction, UpdateMembersAction} from '../../core/actions/members.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-tables',
  templateUrl: './member-crud.component.html',
  styleUrls: ['./member-crud.component.scss']
})
export class MemberCrudComponent implements OnInit, OnDestroy {
  @Select(CoreState.getPageCategoriesRoots) categoriesRoots$: Observable<CategoryTypeModel[]>;
  @Select(CoreState.getSubCategories) subCategories$: Observable<CategoryTypeModel[]>;
  public subCategories: CategoryTypeModel[];
  @Select(CoreState.getMemberUpdated) memberUpdated$: Observable<boolean>;
  public memberForm: FormGroup;
  tittle = 'Adicionar miembro';
  editing = false;
  rootsCategoriesModel: CategoryTypeModel[];
  private categorySub: Subscription;
  private categoriesSub: Subscription;
  private subCategorySub: Subscription;

  onClose() {
    this.dialogRef.close();
  }

  constructor(private store: Store,
              private dialogRef: MatDialogRef<MemberCrudComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MemberModel,
              private formBuilder: FormBuilder) {
    this.categoriesSub = this.categoriesRoots$.subscribe(value => {
      this.rootsCategoriesModel = value;
    });
    this.createForm();
    if (data) {
      this.tittle = 'Actualizar miembro';
      this.setFormData(data);
      this.editing = true;
    }
    this.subCategorySub = this.subCategories$.subscribe(value => {
      this.subCategories = value;
      if (this.subCategories.length > 0){
        this.memberForm.get('subCategoryId').validator = (Validators.compose([Validators.required]) as any);
      } else {
        this.memberForm.get('subCategoryId').clearValidators();
      }
      this.memberForm.get('subCategoryId').updateValueAndValidity();
    });
    this.categorySub = this.memberUpdated$.subscribe(value => {
      if (value) {
        this.dialogRef.close(true);
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new CategoryTypeListRootsActions());
  }

  ngOnDestroy(): void {
    this.subCategorySub.unsubscribe();
    this.categorySub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }

  onSaveOrUpdate() {
    if (this.memberForm.valid && this.editing) {
      this.store.dispatch(new UpdateMembersAction(this.buildMemberModel()));
    } else if (this.memberForm.valid && !this.editing) {
      this.store.dispatch(new AddMembersAction(this.buildMemberModel()));
    }
  }

  buildMemberModel(): MemberModel {
    return {
      id: (this.editing ? this.data.id : undefined),
      firstName: this.memberForm.get('firstName').value,
      lastName: this.memberForm.get('lastName').value,
      document: this.memberForm.get('document').value,
      active: this.memberForm.get('active').value,
      startDate: moment(this.memberForm.get('startDate').value).toDate(),
      categoryType: this.getCategoryType()
    };
  }

  getCategoryType(): CategoryTypeModel {
    if (this.subCategories.length > 0) {
      return this.subCategories.find(value => value.id === this.memberForm.get('subCategoryId').value);
    } else {
      return this.rootsCategoriesModel.find(value => value.id === this.memberForm.get('categoryId').value);
    }
  }

  createForm() {
    this.memberForm = this.formBuilder.group({
      categoryId: [undefined, Validators.required],
      subCategoryId: [undefined],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      document: ['', Validators.required],
      startDate: ['', Validators.required],
      active: [false, Validators.required]
    });
  }

  setFormData(model: MemberModel) {
    if (model.categoryType.parent){
      this.memberForm.get('categoryId').setValue(model.categoryType.parent.id);
      this.store.dispatch(new SubCategoryTypeByCategoryIdActions(model.categoryType.parent));
      this.memberForm.get('subCategoryId').setValue(model.categoryType.id);
    } else {
      this.memberForm.get('categoryId').setValue(model.categoryType.id);
    }
    this.memberForm.get('firstName').setValue(model.firstName);
    this.memberForm.get('lastName').setValue(model.lastName);
    this.memberForm.get('document').setValue(model.document);
    if (model.startDate) {
      const date = moment(model.startDate).toDate();
      const objBeginDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getUTCDate() };
      this.memberForm.get('startDate').setValue(objBeginDate);
    }
    this.memberForm.get('active').setValue(model.active);
  }

  onChangeCategory($event: any) {
    this.store.dispatch(new SubCategoryTypeByCategoryIdActions($event));
  }

  viewSubCategories() {
    return this.subCategories.length > 0;
  }
}
