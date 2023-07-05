import {ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {CategoryTypeListRootsActions, SubCategoryTypeByCategoryIdActions} from '../../core/actions/category-type.actions';
import {CoreState} from '../../core/states/core.state';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {CategoryTypeModel} from '../../core/models/category-type.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemberModel} from '../../core/models/member.model';
import {debounceTime, switchMap} from 'rxjs/operators';
import {MembersService} from '../../core/services/members.service';
import {AddPartnerAction, UpdatePartnerAction} from '../../core/actions/partners.actions';
import {PartnerModel} from '../../core/models/partner.model';
import {PartnerCrudModel} from '../../core/models/partner.crud.model';

@Component({
  selector: 'app-partner-crud',
  templateUrl: './partner-crud.component.html',
  styleUrls: ['./partner-crud.component.scss']
})
export class PartnerCrudComponent implements OnInit, OnDestroy {
  @Select(CoreState.getPageCategoriesRoots) categoriesRoots$: Observable<CategoryTypeModel[]>;
  @Select(CoreState.getSubCategories) subCategories$: Observable<CategoryTypeModel[]>;
  public subCategories: CategoryTypeModel[];
  @Select(CoreState.getPartnerUpdated) partnerUpdated$: Observable<boolean>;
  public partnerForm: FormGroup;
  tittle = 'Adicionar socio';
  editing = false;
  items: MemberModel[] = [];
  members: MemberModel[] = [];
  typeahead = new EventEmitter<string>();
  rootsCategoriesModel: CategoryTypeModel[];
  private categoriesSub: Subscription;
  private subCategorySub: Subscription;
  private partnerSub: Subscription;

  onClose() {
    this.dialogRef.close();
  }

  constructor(private store: Store,
              private dialogRef: MatDialogRef<PartnerCrudComponent>,
              private memberService: MembersService,
              @Inject(MAT_DIALOG_DATA) public data: PartnerModel, private cd: ChangeDetectorRef,
              private formBuilder: FormBuilder) {
    this.createForm();
    if (data) {
      this.tittle = 'Actualizar socio';
      this.editing = true;
      this.setFormData(data);
    }
    this.typeahead
      .pipe(
        debounceTime(200),
        switchMap((term: string, value: number) => {
          if (term) {
            return this.memberService.getMembersByTerms(term, 0, 8);
          } else {
            this.items = [];
            return EMPTY;
          }
        })
      )
      .subscribe(items => {
        this.items = items.content;
        this.cd.markForCheck();
      }, (err) => {
        console.log('error', err);
        this.items = [];
        this.cd.markForCheck();
      });
    this.partnerSub = this.partnerUpdated$.subscribe(value => {
      if (value) {
        this.dialogRef.close(true);
      }
    });
    this.categoriesSub = this.categoriesRoots$.subscribe(value => {
      this.rootsCategoriesModel = value;
    });
    this.subCategorySub = this.subCategories$.subscribe(value => {
      this.subCategories = value;
      if (this.subCategories.length > 0){
        this.partnerForm.get('subCategoryId').validator = (Validators.compose([Validators.required]) as any);
      } else {
        this.partnerForm.get('subCategoryId').clearValidators();
      }
      this.partnerForm.get('subCategoryId').updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new CategoryTypeListRootsActions());
  }

  ngOnDestroy(): void {
    this.categoriesSub.unsubscribe();
    this.subCategorySub.unsubscribe();
  }

  onSaveOrUpdate() {
    if (this.partnerForm.valid && this.editing) {
      this.store.dispatch(new UpdatePartnerAction(this.buildPartnerModel()));
    } else if (this.partnerForm.valid && !this.editing) {
      this.store.dispatch(new AddPartnerAction(this.buildPartnerModel()));
    }
  }

  buildPartnerModel(): PartnerCrudModel {
    return {
      id: (this.editing ? this.data.id : undefined),
      active: this.partnerForm.get('active').value,
      name: this.partnerForm.get('name').value,
      members: this.buildMembers(),
      categoryType: this.getCategoryType()
    };
  }
  getCategoryType(): CategoryTypeModel {
    if (this.subCategories.length > 0) {
      return this.subCategories.find(value => value.id === this.partnerForm.get('subCategoryId').value);
    } else {
      return this.rootsCategoriesModel.find(value => value.id === this.partnerForm.get('categoryId').value);
    }
  }
  buildMembers(): string[] {
    return this.members.map(obj => {
      return obj.id;
    });
  }

  createForm() {
    this.partnerForm = this.formBuilder.group({
      memberSearch: [undefined],
      categoryId: [undefined, Validators.required],
      subCategoryId: [undefined],
      name: [undefined, Validators.required],
      active: [false, Validators.required]
    });
  }

  setFormData(model: PartnerModel) {
    if (model.categoryType.parent){
      this.partnerForm.get('categoryId').setValue(model.categoryType.parent.id);
      this.store.dispatch(new SubCategoryTypeByCategoryIdActions(model.categoryType.parent));
      this.partnerForm.get('subCategoryId').setValue(model.categoryType.id);
    } else {
      this.partnerForm.get('categoryId').setValue(model.categoryType.id);
    }
    this.partnerForm.get('name').setValue(model.name);
    this.partnerForm.get('active').setValue(model.active);
    this.members = model.members;
  }

  onSelect(memberModel: MemberModel) {
    if (memberModel && this.members.findIndex(value => value.id === memberModel.id) === -1){
      this.members.push(memberModel);
      this.partnerForm.get('memberSearch').setValue(undefined);
    } else {
      this.partnerForm.get('memberSearch').setValue(undefined);
    }
  }

  deleteMember(member: MemberModel) {
    this.members = this.members.filter(obj => obj.id !== member.id);
  }

  isValid() {
    return this.partnerForm.valid && this.members.length > 0;
  }

  onChangeCategory($event: any) {
    this.store.dispatch(new SubCategoryTypeByCategoryIdActions($event));
  }

  viewSubCategories() {
    return this.subCategories.length > 0;
  }
}
