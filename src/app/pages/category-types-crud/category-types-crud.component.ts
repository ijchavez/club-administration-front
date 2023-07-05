import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {AddCategoryTypeAction, CategoryTypeListRootsActions, UpdateCategoryTypeAction} from '../../core/actions/category-type.actions';
import {CoreState} from '../../core/states/core.state';
import {Observable} from 'rxjs';
import {CategoryTypeModel} from '../../core/models/category-type.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tables',
  templateUrl: './category-types-crud.component.html',
  styleUrls: ['./category-types-crud.component.scss']
})
export class CategoryTypesCrudComponent implements OnInit, OnDestroy {
  @Select(CoreState.getPageCategoriesRoots) categoriesRoots$: Observable<CategoryTypeModel[]>;
  @Select(CoreState.getCategoryUpdated) categoriesUpdated$: Observable<boolean>;
  public categoryTypeForm: FormGroup;
  tittle  = 'Adicionar tipo de categoría';
  editing = false;
  onClose() {
    this.dialogRef.close();
  }


  constructor(private store: Store,
              private dialogRef: MatDialogRef<CategoryTypesCrudComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CategoryTypeModel,
              private formBuilder: FormBuilder) {
    this.createForm();
    if (data){
      this.tittle = 'Actualizar tipo de categoría';
      this.setFormData(data);
      this.editing = true;
    }
    this.categoriesUpdated$.subscribe(value => {
      if (value){
        this.dialogRef.close(true);
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new CategoryTypeListRootsActions());
  }
  ngOnDestroy(): void {
  }

  onSaveOrUpdate() {
    if (this.categoryTypeForm.valid && this.editing) {
      this.store.dispatch(new UpdateCategoryTypeAction(this.buildCategoryTypeModel()));
    } else if (this.categoryTypeForm.valid && !this.editing) {
      this.store.dispatch(new AddCategoryTypeAction(this.buildCategoryTypeModel()));
    }
  }

  buildCategoryTypeModel(): CategoryTypeModel {
    return {
      id: (this.editing ? this.data.id : undefined),
      name: this.categoryTypeForm.get('name').value,
      root: !(this.categoryTypeForm.get('subCategory').value),
      parentId: this.categoryTypeForm.get('categoryId').value
    };
  }

  createForm() {
    this.categoryTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      subCategory: [false],
      categoryId: [undefined, []]
    });
    this.categoryTypeForm.get('subCategory').valueChanges.subscribe(val => {
      if (val) {
        this.categoryTypeForm.get('categoryId').setValidators(Validators.required);
      } else {
        this.categoryTypeForm.get('categoryId').setValue(undefined);
        this.categoryTypeForm.get('categoryId').clearValidators();
      }
      this.categoryTypeForm.controls.categoryId.updateValueAndValidity();
    });
  }
  setFormData(model: CategoryTypeModel) {
    this.categoryTypeForm.get('name').setValue(model.name);
    this.categoryTypeForm.get('subCategory').setValue((!model.root));
    this.categoryTypeForm.get('categoryId').setValue(model.parentId);
  }
}
