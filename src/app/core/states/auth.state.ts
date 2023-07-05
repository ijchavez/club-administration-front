import {Injectable, NgZone} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Navigate} from '@ngxs/router-plugin';
import {Action, Selector, State, StateContext, StateToken, Store} from '@ngxs/store';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {LoginService} from '../services/login.service';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthModel} from '../models/auth.model';
import {AuthService} from '../services/auth.service';
import {StateResetAll} from 'ngxs-reset-plugin';
import {LoginAction, LogoutAction, UserInfoAction} from '../actions/auth.actions';
import {UserModel} from '../models/user.model';
import {UserService} from '../services/user.service';
import {MessageType, ShowMessageAction} from '../actions/core.actions';

export interface AuthStateModel {
  login: boolean;
  token: AuthModel;
  userInfo: UserModel;
}

const initialState: AuthStateModel = {
  login: false,
  token: null,
  userInfo: null
};

const CORE_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State<AuthStateModel>({
  name: CORE_STATE_TOKEN,
  defaults: initialState
})
@Injectable()
export class AuthState {

  constructor(
    private translate: TranslateService,
    private store: Store,
    private ngZone: NgZone,
    private toast: ToastrService,
    private loginService: LoginService,
    private userService: UserService,
    private authService: AuthService,
  ) {
  }

  @BlockUI() blockUI: NgBlockUI;

  @Selector()
  static getLogin(state: AuthStateModel) {
    return state.login;
  }

  @Selector()
  static getUserInfo(state: AuthStateModel) {
    return state.userInfo;
  }

  @Selector([AuthState.getUserInfo])
  static getFullName(userInfo: UserModel) {
    if (userInfo){
      return userInfo.firstName;
    }
    return '';
  }

  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    return this.ngZone.run(() => {
      return this.loginService.login(action.payload).pipe(
        tap((model: AuthModel) => {
          this.authService.setAuthFromLocalStorage(model);
          ctx.patchState({
            token: model
          });
          this.store.dispatch(new Navigate(['/']));
        }),
        catchError(err => {
          this.store.dispatch(new ShowMessageAction({msg: 'Usuario o contraseña incorrectos', type: MessageType.ERROR}));
          return throwError(err);
        }));
    });
  }

  @Action(UserInfoAction)
  getUserInfoAction(ctx: StateContext<AuthStateModel>) {

    return this.ngZone.run(() => {
      return this.userService.getAccount().pipe(
        tap((model: UserModel) => {
          ctx.patchState({
            userInfo: model
          });
        }),
        catchError(err => {
          return throwError(err);
        }));
    });
  }

  @Action(LogoutAction)
  logoutAction(ctx: StateContext<AuthStateModel>) {
    this.authService.removeToken();
    return ctx.dispatch([
      new StateResetAll(),
      new Navigate(['/auth'])
    ]);
  }

}
