import {CategoryTypeModel} from './category-type.model';

export class MemberModel {
  id: string;
  startDate: Date;
  firstName?: string;
  fullName?: string;
  lastName?: string;
  document?: string;
  categoryType?: CategoryTypeModel;
  subCategory?: CategoryTypeModel;
  partnerId?: string;
  active?: boolean;
}
