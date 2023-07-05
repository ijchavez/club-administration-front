import {CategoryTypeModel} from './category-type.model';

export class ContributionSuggestedModel {
  id: string;
  paymentMethod: string;
  categoryType: CategoryTypeModel;
  amount?: string;
}
