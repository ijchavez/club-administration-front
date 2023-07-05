import {PageableModel} from './pageable.model';
import {SortModel} from './sort.model';

export class PageModel<T> {
  content: T[];
  pageable: PageableModel;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  numberOfElements: number;
  sort: SortModel;
  first: boolean;
  number: number;
  empty: boolean;

  constructor() {
    this.content = [];
  }
}
