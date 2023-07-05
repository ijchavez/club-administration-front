import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {CategoryTypesComponent} from '../../pages/category-types/category-types.component';
import {ContributionSuggestedComponent} from '../../pages/contributions-suggested/contribution-suggested.component';
import {MembersComponent} from '../../pages/members/members.component';
import {PartnersComponent} from '../../pages/partners/partners.component';
import {ContributionsComponent} from '../../pages/contributions/contributions.component';
import {ReportContributionComponent} from '../../pages/reports-contribution/report-contribution.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'contributions',         component: ContributionsComponent },
    { path: 'category-type',         component: CategoryTypesComponent },
    { path: 'contribution-suggested',         component: ContributionSuggestedComponent },
    { path: 'members',         component: MembersComponent },
    { path: 'partners',         component: PartnersComponent },
    { path: 'reports',         component: ReportContributionComponent },
];
