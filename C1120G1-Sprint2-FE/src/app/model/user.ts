import {Account} from './account';
import {Ward} from './ward';

export interface User {
  user_id: number;
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
