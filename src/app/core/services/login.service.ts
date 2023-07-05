import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LoginModel} from '../models/login.model';
import {Observable} from 'rxjs';
import {AuthModel} from '../models/auth.model';
import {UserModel} from '../models/user.model';

const API_AUTH_URL = `${environment.api}/auth`;

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
  ) { }
  login(model: LoginModel): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${API_AUTH_URL}/login`, model);
  }

  getAccount(): Observable<UserModel> {
    return this.http.get<UserModel>(`${API_AUTH_URL}/account`);
  }
}
