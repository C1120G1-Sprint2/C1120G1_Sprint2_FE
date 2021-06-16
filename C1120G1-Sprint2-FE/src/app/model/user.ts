import {Account} from './account';
import {Ward} from './ward';

export interface User {
  userId: number;
  name: string;
  birthday: string;
  gender: number;
  email: string;
  phone: string;
  cardId: string;
  avatarUrl: string;
  account: Account;
  ward: Ward;
}
