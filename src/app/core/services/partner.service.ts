import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {PageModel} from '../models/page.model';
import {PartnerModel} from '../models/partner.model';
import {PartnerCrudModel} from '../models/partner.crud.model';
import {MemberModel} from '../models/member.model';

const API_PARTNER_URL = `${environment.api}/partner`;

@Injectable()
export class PartnerService {
  constructor(
    private http: HttpClient,
  ) { }

  getPartners(page: number, size: number): Observable<PageModel<PartnerModel>> {
    return this.http.post<PageModel<PartnerModel>>(`${API_PARTNER_URL}/filter?offset=0&page=${page}&size=${size}`,{});
  }

  addPartner(data: PartnerCrudModel): Observable<any> {
    return this.http.post<any>(`${API_PARTNER_URL}/create`, data);
  }

  updatePartner(data: PartnerCrudModel): Observable<any> {
    return this.http.put<any>(`${API_PARTNER_URL}/${data.id}`, data);
  }

  deletePartner(data: PartnerCrudModel): Observable<any> {
    return this.http.post<any>(`${API_PARTNER_URL}/delete/${data.id}`, {});
  }
  getPartnersByTerms(terms: string, page: number, size: number): Observable<PageModel<PartnerModel>> {
    return this.http.post<PageModel<PartnerModel>>(`${API_PARTNER_URL}/filter?offset=0&page=${page}&size=${size}`, {name: terms});
  }
}
