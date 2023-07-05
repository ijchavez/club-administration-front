import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TableGenericComponent} from '../../pages/tables-dynamic/table-generic.component';
import {CategoryTypesComponent} from '../../pages/category-types/category-types.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgSelectModule} from '@ng-select/ng-select';
import {CoreModule} from '../../core/core.module';
import {CategoryTypesCrudComponent} from '../../pages/category-types-crud/category-types-crud.component';
import {ContributionSuggestedComponent} from '../../pages/contributions-suggested/contribution-suggested.component';
import {ContributionsSuggestedCrudComponent} from '../../pages/contributions-suggested-crud/contributions-suggested-crud.component';
import {ConfirmDialogComponent} from '../../pages/confirm-dialog/confirm-dialog.component';
import {MembersComponent} from '../../pages/members/members.component';
import {MemberCrudComponent} from '../../pages/member-crud/member-crud.component';
import {PartnersComponent} from '../../pages/partners/partners.component';
import {PartnerCrudComponent} from '../../pages/partner-crud/partner-crud.component';
import {ContributionsComponent} from '../../pages/contributions/contributions.component';
import {ContributionsCrudComponent} from '../../pages/contributions-crud/contributions-crud.component';
import {MemberFilterComponent} from '../../pages/member-filter/member-filter.component';
import {BarChartModule, LineChartModule} from '@swimlane/ngx-charts';
import {ReportContributionComponent} from '../../pages/reports-contribution/report-contribution.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatDialogModule,
    NgSelectModule,
    CoreModule,
    BarChartModule,
    LineChartModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    TableGenericComponent,
    CategoryTypesComponent,
    ContributionSuggestedComponent,
    ContributionsComponent,
    ContributionsCrudComponent,
    CategoryTypesCrudComponent,
    MemberFilterComponent,
    ContributionsSuggestedCrudComponent,
    MembersComponent,
    MemberCrudComponent,
    PartnerCrudComponent,
    ConfirmDialogComponent,
    PartnersComponent,
    ReportContributionComponent
  ],
  entryComponents: [
    CategoryTypesCrudComponent,
    ContributionsSuggestedCrudComponent,
    ConfirmDialogComponent,
    MemberFilterComponent,
  ],
})

export class AdminLayoutModule {}
