import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LoginModel} from '../models/login.model';
import {Observable} from 'rxjs';
import {AuthModel} from '../models/auth.model';
import {UserModel} from '../models/user.model';
import {PageModel} from '../models/page.model';
import {CategoryTypeModel} from '../models/category-type.model';

const API_CATEGORY_TYPE_URL = `${environment.api}/category-type`;

@Injectable()
export class CategoryTypesService {
  constructor(
    private http: HttpClient,
  ) { }

  getCategoryTypes(page: number, size: number): Observable<PageModel<CategoryTypeModel>> {
    return this.http.get<PageModel<CategoryTypeModel>>(`${API_CATEGORY_TYPE_URL}/filter?offset=0&page=${page}&size=${size}`);
  }

  getCategoryTypesRoots(): Observable<CategoryTypeModel[]> {
    return this.http.get<CategoryTypeModel[]>(`${API_CATEGORY_TYPE_URL}/get-roots`);
  }

  getSubCategoryTypeById(data: CategoryTypeModel): Observable<CategoryTypeModel[]> {
    return this.http.get<CategoryTypeModel[]>(`${API_CATEGORY_TYPE_URL}/list/${data.id}`);
  }

  updateCategoryType(data: CategoryTypeModel): Observable<CategoryTypeModel> {
    return this.http.put<CategoryTypeModel>(`${API_CATEGORY_TYPE_URL}/${data.id}`, data);
  }

  addCategoryType(data: CategoryTypeModel): Observable<CategoryTypeModel> {
    return this.http.post<CategoryTypeModel>(`${API_CATEGORY_TYPE_URL}/create`, data);
  }
  deleteCategoryType(data: CategoryTypeModel): Observable<any> {
    return this.http.delete<any>(`${API_CATEGORY_TYPE_URL}/delete/${data.id}`);
  }
}
