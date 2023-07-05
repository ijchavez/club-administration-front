import {MemberModel} from '../models/member.model';
import {MemberFilterModel} from '../models/member-filter.model';

export class MembersListActions {
  static readonly type = '[Members] List Members';
  constructor(public payload: { page: number, size: number, filter: MemberFilterModel}) {}
}
export class DeleteMembersAction {
  static readonly type = '[Members] Delete Members';
  constructor(public payload: MemberModel) {}
}


export class UpdateMembersAction {
  static readonly type = '[Members] Update Members';
  constructor(public payload: MemberModel) {}
}

export class AddMembersAction {
  static readonly type = '[Members] Add Members';
  constructor(public payload: MemberModel) {}
}
