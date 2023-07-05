import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {AddCategoryTypeAction, CategoryTypeListRootsActions, UpdateCategoryTypeAction} from '../../core/actions/category-type.actions';
import {CoreState} from '../../core/states/core.state';
import {Observable} from 'rxjs';
import {CategoryTypeModel} from '../../core/models/category-type.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContributionSuggestedModel} from '../../core/models/contribution-suggested.model';
import {AddContributionSuggestedAction, UpdateContributionSuggestedAction} from '../../core/actions/contribution-suggested.actions';

@Component({
  selector: 'app-tables',
  templateUrl: './contributions-suggested-crud.component.html',
  styleUrls: ['./contributions-suggested-crud.component.scss']
})
export class ContributionsSuggestedCrudComponent implements OnInit, OnDestroy {
  @Select(CoreState.getPageCategoriesRoots) categoriesRoots$: Observable<CategoryTypeModel[]>;
  @Select(CoreState.getCategoryUpdated) categoriesUpdated$: Observable<boolean>;
  public categoryTypeForm: FormGroup;
  tittle = 'Adicionar contribución sugerida';
  editing = false;
  paymentMethods: string[] = ['CASH', 'CREDIT_CARD'];
  rootsCategoriesModel: CategoryTypeModel[];

  onClose() {
    this.dialogRef.close();
  }


  constructor(private store: Store,
              private dialogRef: MatDialogRef<ContributionsSuggestedCrudComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ContributionSuggestedModel,
              private formBuilder: FormBuilder) {
    this.categoriesRoots$.subscribe(value => {
      this.rootsCategoriesModel = value;
    });
    this.createForm();
    if (data) {
      this.tittle = 'Actualizar contribución sugerida';
      this.setFormData(data);
      this.editing = true;
    }
    this.categoriesUpdated$.subscribe(value => {
      if (value) {
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
      this.store.dispatch(new UpdateContributionSuggestedAction(this.buildContributionSuggestedModel()));
    } else if (this.categoryTypeForm.valid && !this.editing) {
      this.store.dispatch(new AddContributionSuggestedAction(this.buildContributionSuggestedModel()));
    }
  }

  buildContributionSuggestedModel(): ContributionSuggestedModel {
    return {
      id: (this.editing ? this.data.id : undefined),
      paymentMethod: this.categoryTypeForm.get('paymentMethod').value,
      amount: this.categoryTypeForm.get('amount').value,
      categoryType: this.getCategoryTypeById(this.categoryTypeForm.get('categoryId').value)
    };
  }

  getCategoryTypeById(id: string): CategoryTypeModel {
    return this.rootsCategoriesModel.find(value => value.id === id);
  }

  createForm() {
    this.categoryTypeForm = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      categoryId: [undefined, Validators.required],
      amount: [undefined, Validators.required]
    });
  }

  setFormData(model: ContributionSuggestedModel) {
    this.categoryTypeForm.get('categoryId').setValue(model.categoryType.id);
    this.categoryTypeForm.get('amount').setValue(model.amount);
    this.categoryTypeForm.get('paymentMethod').setValue(model.paymentMethod);
  }
}
