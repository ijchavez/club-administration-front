import {PartnerModel} from './partner.model';
import {IssuerModel} from './issuer.model';

export class ContributionsModel {
  id: string;
  paymentMethod: string;
  amount: number;
  date: Date;
  issuer?: IssuerModel;
  partner: PartnerModel;
}
