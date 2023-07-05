import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {CoreState} from '../../core/states/core.state';
import {ContributionsModel} from '../../core/models/contributions.model';
import {ExportContributionsByMonthAction, GetContributionsByMonthAction} from '../../core/actions/contributions.actions';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormControl} from '@angular/forms';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';
import {MatDatepicker} from '@angular/material/datepicker';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-report-contribution',
  templateUrl: './report-contribution.component.html',
  styleUrls: ['./report-contribution.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ReportContributionComponent implements OnInit, OnDestroy {
  @Select(CoreState.getContributions) contributions$: Observable<ContributionsModel[]>;
  model: ContributionsModel[] = [];
  private sub: Subscription;

  constructor(private store: Store) {
  }
  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  ngOnInit(): void {
    this.sub = this.contributions$.subscribe(value => {
      this.model = value;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSearch() {
    const date = moment(this.date.value);
    this.store.dispatch(new GetContributionsByMonthAction({month: date.month() + 1, year: date.year()}));
  }
  onExport() {
    const date = moment(this.date.value);
    this.store.dispatch(new ExportContributionsByMonthAction({month: date.month() + 1, year: date.year()}));
  }
}
