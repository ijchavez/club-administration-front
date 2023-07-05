import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CoreModule} from './core/core.module';
import {CoreState} from './core/states/core.state';
import {NgxsModule, NgxsModuleOptions} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsResetPluginModule} from 'ngxs-reset-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxPermissionsModule} from 'ngx-permissions';
import {AppRoutingModule} from './app-routing.module';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from './components/components.module';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoginService} from './core/services/login.service';
import {AuthState} from './core/states/auth.state';
import {UserService} from './core/services/user.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {CategoryTypesService} from './core/services/category-types.service';
import {ContributionSuggestedService} from './core/services/contribution-suggested.service';
import {MembersService} from './core/services/members.service';
import {PartnerService} from './core/services/partner.service';
import {ContributionsService} from './core/services/contributions.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: !environment.production,
  selectorOptions: {
    suppressErrors: false,
    injectContainerState: false,
  },
  compatibility: {
    strictContentSecurityPolicy: true,
  },
};

export const ngxsLoggerConfig = {
  disabled: environment.production,
  collapsed: true,
};


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    CoreModule,
    NgbCollapseModule,
    NgxChartsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      newestOnTop: true,
      maxOpened: 1,
      autoDismiss: true,
      positionClass: 'toast-top-right',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    AppRoutingModule,
    NgxsModule.forRoot([CoreState, AuthState], ngxsConfig),
    NgxsRouterPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(ngxsLoggerConfig),
    ComponentsModule
  ],
  providers: [
    LoginService,
    UserService,
    CategoryTypesService,
    ContributionSuggestedService,
    ContributionsService,
    PartnerService,
    MembersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
