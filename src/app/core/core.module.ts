import {AuthInterceptor} from './interceptors/auth-http.interceptor';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BlockUIModule} from 'ng-block-ui';
import { DateAdapter as CoreDateAdapter, MAT_DATE_FORMATS as CORE_MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './services/auth.service';
import {Store} from '@ngxs/store';
import {FlexLayoutModule} from '@angular/flex-layout';

export const AuthInterceptorFactory = (authService: AuthService, store: Store) => {
  return new AuthInterceptor(authService, store);
};

export const MOMENTJS_DATE_FORMAT = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    BlockUIModule.forRoot(),
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatDividerModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatStepperModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BlockUIModule,

    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatDividerModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatStepperModule,
    NgbModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: AuthInterceptorFactory,
      multi: true,
      deps: [AuthService, Store],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-UY' },
    { provide: CoreDateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: CORE_MAT_DATE_FORMATS, useValue: MOMENTJS_DATE_FORMAT},
  ],
})
export class CoreModule {
}
