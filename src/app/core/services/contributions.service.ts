import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {PageModel} from '../models/page.model';
import {CategoryTypeModel} from '../models/category-type.model';
import {ContributionsModel} from '../models/contributions.model';
import {map} from 'rxjs/operators';
import * as FileSaver from 'file-saver';

const API_CONTRIBUTION_URL = `${environment.api}/contribution`;

@Injectable()
export class ContributionsService {
  constructor(
    private http: HttpClient,
  ) { }

  getContributions(page: number, size: number): Observable<PageModel<ContributionsModel>> {
    return this.http.get<PageModel<ContributionsModel>>(`${API_CONTRIBUTION_URL}/filter?offset=0&page=${page}&size=${size}`);
  }
  getContributionsByMonth(month: number, year: number): Observable<ContributionsModel[]> {
    return this.http.get<ContributionsModel[]>(`${API_CONTRIBUTION_URL}/${month}/${year}`);
  }
  exportContributionsByMonth(month: number, year: number): Observable<any> {
    return this.http.get<Blob>(`${API_CONTRIBUTION_URL}/export/excel/${month}/${year}`, { responseType: 'blob' as 'json', observe: 'response' }).pipe(
      map((result: HttpResponse<Blob>) => {
        FileSaver.saveAs(result.body, 'Contribuciones-' + month + '-' + year + '.xls');
        return result;
      }));
  }
  addContributions(data: ContributionsModel): Observable<ContributionsModel> {
    return this.http.post<ContributionsModel>(`${API_CONTRIBUTION_URL}/create`, data);
  }

  updateContributions(data: ContributionsModel): Observable<CategoryTypeModel> {
    return this.http.put<CategoryTypeModel>(`${API_CONTRIBUTION_URL}/${data.id}`, data);
  }

  deleteContributions(data: ContributionsModel): Observable<any> {
    return this.http.post<any>(`${API_CONTRIBUTION_URL}/delete/${data.id}`, {});
  }

}
