export enum MessageType {
  SUCCESS, ERROR, WARNING, INFO
}
export class ShowMessageAction {
  static readonly type = '[Core] Show Message';
  constructor(public payload: { msg: string, title?: string, type?: MessageType, options?}) {}
}
