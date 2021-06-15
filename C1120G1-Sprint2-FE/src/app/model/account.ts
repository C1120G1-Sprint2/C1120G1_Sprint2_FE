import {AccountStatus} from './accountStatus';

export interface Account {
  username: string;
  password: string;
  registerDay: string;
  point: string;
  accountStatus: AccountStatus;
}
