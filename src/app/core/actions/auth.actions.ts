import {LoginModel} from '../models/login.model';

export enum MessageType {
  SUCCESS, ERROR, WARNING, INFO
}

export class LoginAction {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginModel) {}
}

export class LogoutAction {
  static readonly type = '[Auth] Logout';
}

export class UserInfoAction {
  static readonly type = '[Auth] Get User Information';
}
