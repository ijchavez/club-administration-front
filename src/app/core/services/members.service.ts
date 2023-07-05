import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {PageModel} from '../models/page.model';
import {MemberModel} from '../models/member.model';
import {MemberFilterModel} from '../models/member-filter.model';

const API_MEMBER_URL = `${environment.api}/member`;

@Injectable()
export class MembersService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getMembers(page: number, size: number, memberFilter: MemberFilterModel): Observable<PageModel<MemberModel>> {
    return this.http.post<PageModel<MemberModel>>(`${API_MEMBER_URL}/filter?offset=0&page=${page}&size=${size}`, memberFilter);
  }

  getMembersByTerms(terms: string, page: number, size: number): Observable<PageModel<MemberModel>> {
    return this.http.post<PageModel<MemberModel>>(`${API_MEMBER_URL}/filter?offset=0&page=${page}&size=${size}`, {firstName: terms});
  }

  addMember(data: MemberModel): Observable<MemberModel> {
    return this.http.post<MemberModel>(`${API_MEMBER_URL}/create`, data);
  }

  updateMember(data: MemberModel): Observable<MemberModel> {
    return this.http.put<MemberModel>(`${API_MEMBER_URL}/${data.id}`, data);
  }

  deleteMember(data: MemberModel): Observable<any> {
    return this.http.post<any>(`${API_MEMBER_URL}/delete/${data.id}`, {});
  }

}
