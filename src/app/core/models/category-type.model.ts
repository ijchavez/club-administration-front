export class CategoryTypeModel {
  id: string;
  name: string;
  root: boolean;
  parent?: CategoryTypeModel;
  parentId?: string;
  parentName?: string;
}
