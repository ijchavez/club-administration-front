import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id: number;
  username: string;
  password: string;
  firstName: string;
  fullName: string;
  lastName: string;
}
