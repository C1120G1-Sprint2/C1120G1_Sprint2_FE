import {Account} from './account';

export interface Notifications {
  notifyId: number;
  notifyContent: string;
  notifyDate: string;
  account: Account;
}
