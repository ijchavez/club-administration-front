import {MemberModel} from './member.model';
import {CategoryTypeModel} from './category-type.model';

export class PartnerModel {
  id: string;
  name: string;
  categoryType: CategoryTypeModel;
  members: MemberModel[];
  active: boolean;
}
