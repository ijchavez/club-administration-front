import {CategoryTypeModel} from './category-type.model';

export class PartnerCrudModel {
  id: string;
  name: string;
  categoryType: CategoryTypeModel;
  members: string[];
  active: boolean;
}
