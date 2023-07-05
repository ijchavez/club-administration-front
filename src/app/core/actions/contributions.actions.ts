import {ContributionsModel} from '../models/contributions.model';

export class ContributionsListsActions {
  static readonly type = '[Contributions] List Contributions';
  constructor(public payload: { page: number, size: number}) {}
}

export class UpdateContributionsAction {
  static readonly type = '[Contributions] Update Contributions';
  constructor(public payload: ContributionsModel) {}
}

export class AddContributionsAction {
  static readonly type = '[Contributions] Add Contributions';
  constructor(public payload: ContributionsModel) {}
}

export class DeleteContributionsAction {
  static readonly type = '[Contributions] Delete Contribution';
  constructor(public payload: ContributionsModel) {}
}


export class GetContributionsByMonthAction {
  static readonly type = '[Contributions] Get Contributions by month';
  constructor(public payload: {month: number, year: number}) {}
}
export class ExportContributionsByMonthAction {
  static readonly type = '[Contributions] Export Contributions by month';
  constructor(public payload: {month: number, year: number}) {}
}
