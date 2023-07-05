import {ContributionSuggestedModel} from '../models/contribution-suggested.model';

export class ContributionSuggestedListActions {
  static readonly type = '[Contribution Suggested] List Contribution Suggested';
  constructor(public payload: { page: number, size: number}) {}
}

export class UpdateContributionSuggestedAction {
  static readonly type = '[Contribution Suggested] Update Contribution Suggested';
  constructor(public payload: ContributionSuggestedModel) {}
}

export class AddContributionSuggestedAction {
  static readonly type = '[Contribution Suggested] Add Contribution Suggested';
  constructor(public payload: ContributionSuggestedModel) {}
}

export class DeleteContributionSuggestedAction {
  static readonly type = '[Contribution Suggested] Delete Contribution Suggested';
  constructor(public payload: ContributionSuggestedModel) {}
}
