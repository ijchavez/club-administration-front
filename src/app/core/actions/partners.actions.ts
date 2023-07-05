import {PartnerCrudModel} from '../models/partner.crud.model';

export class PartnersListActions {
  static readonly type = '[Partner] List Partners';
  constructor(public payload: { page: number, size: number}) {}
}
export class DeletePartnerAction {
  static readonly type = '[Partner] Delete Partner';
  constructor(public payload: PartnerCrudModel) {}
}

export class UpdatePartnerAction {
  static readonly type = '[Partner] Update Partner';
  constructor(public payload: PartnerCrudModel) {}
}

export class AddPartnerAction {
  static readonly type = '[Partner] Add Partner';
  constructor(public payload: PartnerCrudModel) {}
}
