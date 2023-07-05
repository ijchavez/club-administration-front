import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LoginModel} from '../models/login.model';
import {Observable} from 'rxjs';
import {AuthModel} from '../models/auth.model';
import {UserModel} from '../models/user.model';
import {PageModel} from '../models/page.model';
import {CategoryTypeModel} from '../models/category-type.model';
import {ContributionSuggestedModel} from '../models/contribution-suggested.model';

const API_CONTRIBUTION_URL = `${environment.api}/contribution-suggested`;

@Injectable()
export class ContributionSuggestedService {
  constructor(
    private http: HttpClient,
  ) { }

  getContributionSuggested(page: number, size: number): Observable<PageModel<ContributionSuggestedModel>> {
    return this.http.get<PageModel<ContributionSuggestedModel>>(`${API_CONTRIBUTION_URL}/filter?offset=0&page=${page}&size=${size}`);
  }

  addContributionSuggested(data: ContributionSuggestedModel): Observable<ContributionSuggestedModel> {
    return this.http.post<ContributionSuggestedModel>(`${API_CONTRIBUTION_URL}/create`, data);
  }

  updateContributionSuggested(data: ContributionSuggestedModel): Observable<CategoryTypeModel> {
    return this.http.put<CategoryTypeModel>(`${API_CONTRIBUTION_URL}/${data.id}`, data);
  }

  deleteContributionSuggested(data: ContributionSuggestedModel): Observable<any> {
    return this.http.post<any>(`${API_CONTRIBUTION_URL}/delete/${data.id}`, {});
  }

}
