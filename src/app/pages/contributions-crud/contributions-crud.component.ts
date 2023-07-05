import {ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {CategoryTypeListRootsActions} from '../../core/actions/category-type.actions';
import {CoreState} from '../../core/states/core.state';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {CategoryTypeModel} from '../../core/models/category-type.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PartnerModel} from '../../core/models/partner.model';
import {debounceTime, switchMap} from 'rxjs/operators';
import {PartnerService} from '../../core/services/partner.service';
import {ContributionsModel} from '../../core/models/contributions.model';
import {AddContributionsAction, UpdateContributionsAction} from '../../core/actions/contributions.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-tables',
  templateUrl: './contributions-crud.component.html',
  styleUrls: ['./contributions-crud.component.scss']
})
export class ContributionsCrudComponent implements OnInit, OnDestroy {
  @Select(CoreState.getPageCategoriesRoots) categoriesRoots$: Observable<CategoryTypeModel[]>;
  @Select(CoreState.getContributionUpdated) contributionUpdated$: Observable<boolean>;
  public contributionForm: FormGroup;
  tittle = 'Adicionar contribución';
  editing = false;
  paymentMethods: string[] = ['CASH', 'CREDIT_CARD'];
  rootsCategoriesModel: CategoryTypeModel[];
  items: PartnerModel[] = [];
  selectedPartner: PartnerModel;
  contributionUpdatedSub: Subscription;
  typeahead = new EventEmitter<string>();
  onClose() {
    this.dialogRef.close();
  }
  constructor(private store: Store,
              private dialogRef: MatDialogRef<ContributionsCrudComponent>,
              private partnerService: PartnerService,
              @Inject(MAT_DIALOG_DATA) public data: ContributionsModel,
              private cd: ChangeDetectorRef,
              private formBuilder: FormBuilder) {
    this.categoriesRoots$.subscribe(value => {
      this.rootsCategoriesModel = value;
    });
    this.createForm();
    if (data) {
      this.tittle = 'Actualizar contribución';
      this.setFormData(data);
      this.editing = true;
    }
    this.typeahead
      .pipe(
        debounceTime(200),
        switchMap((term: string) => {
          if (term) {
            return this.partnerService.getPartnersByTerms(term, 0, 8);
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
    this.contributionUpdatedSub = this.contributionUpdated$.subscribe(value => {
      if (value) {
        this.dialogRef.close(true);
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new CategoryTypeListRootsActions());
  }

  ngOnDestroy(): void {
    this.contributionUpdatedSub.unsubscribe();
  }

  onSaveOrUpdate() {
    if (this.contributionForm.valid && this.editing) {
      this.store.dispatch(new UpdateContributionsAction(this.buildContributionModel()));
    } else if (this.contributionForm.valid && !this.editing) {
      this.store.dispatch(new AddContributionsAction(this.buildContributionModel()));
    }
  }

  buildContributionModel(): ContributionsModel {
    return {
      date: moment(this.contributionForm.get('date').value).toDate(),
      partner: this.selectedPartner,
      id: (this.editing ? this.data.id : undefined),
      paymentMethod: this.contributionForm.get('paymentMethod').value,
      amount: this.contributionForm.get('amount').value
    };
  }

  createForm() {
    this.contributionForm = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      date: ['', Validators.required],
      partner: ['', Validators.required],
      amount: [undefined, Validators.required]
    });
  }

  setFormData(model: ContributionsModel) {
    this.selectedPartner = model.partner;
    this.items = [model.partner];
    this.contributionForm.get('partner').setValue(model.partner.id);
    this.contributionForm.get('amount').setValue(model.amount);
    this.contributionForm.get('paymentMethod').setValue(model.paymentMethod);
    if (model.date) {
      const date = moment(model.date).toDate();
      const objBeginDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getUTCDate() };
      this.contributionForm.get('date').setValue(objBeginDate);
    }
    this.contributionForm.get('partner').disable({onlySelf: true, emitEvent: true});
    this.contributionForm.get('paymentMethod').disable({onlySelf: true, emitEvent: true});
    this.contributionForm.get('date').disable({onlySelf: true, emitEvent: true});
  }

  onSelect(partner: PartnerModel) {
    this.selectedPartner = partner;
  }
}
