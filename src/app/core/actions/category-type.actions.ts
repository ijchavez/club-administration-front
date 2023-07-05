import {CategoryTypeModel} from '../models/category-type.model';

export class CategoryTypeListActions {
  static readonly type = '[CategoryType] List Category Type';
  constructor(public payload: { page: number, size: number}) {}
}

export class CategoryTypeListRootsActions {
  static readonly type = '[CategoryType] List Category Type Roots';
  constructor() {}
}

export class SubCategoryTypeByCategoryIdActions {
  static readonly type = '[CategoryType] Sub Category Type by Category Id';
  constructor(public payload: CategoryTypeModel) {}
}


export class UpdateCategoryTypeAction {
  static readonly type = '[CategoryType] Update Category Type';
  constructor(public payload: CategoryTypeModel) {}
}

export class AddCategoryTypeAction {
  static readonly type = '[CategoryType] Add Category Type';
  constructor(public payload: CategoryTypeModel) {}
}

export class DeleteCategoryTypeAction {
  static readonly type = '[CategoryType] Delete Category Type';
  constructor(public payload: CategoryTypeModel) {}
}
