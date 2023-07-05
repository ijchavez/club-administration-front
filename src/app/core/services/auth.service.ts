import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {AuthModel} from '../models/auth.model';
import {environment} from 'src/environments/environment';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authLocalStorageToken = `${environment.appVersion}`;

  constructor() {
  }

  removeToken() {
    localStorage.removeItem(this.authLocalStorageToken);
  }

  setAuthFromLocalStorage(auth: AuthModel): boolean {
    if (auth && auth.token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  getAuthFromLocalStorage(): AuthModel | undefined {
    const lsValue = localStorage.getItem(this.authLocalStorageToken);
    if (!lsValue) {
      return undefined;
    }
    return JSON.parse(lsValue);
  }
}
