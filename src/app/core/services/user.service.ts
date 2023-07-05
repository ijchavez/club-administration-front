import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';

const API_USER_URL = `${environment.api}/user`;

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }

  getAccount(): Observable<UserModel> {
    return this.http.get<UserModel>(`${API_USER_URL}/account`);
  }
}
