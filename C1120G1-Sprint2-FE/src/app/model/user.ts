import {Account} from './account';
import {Ward} from './ward';
import {Ticket} from "./ticket";

export interface User {
  user_id: number;
  name: string;
  birthday: string;
  gender: number;
  email: string;
  phone: string;
  idCard: string;
  avatarUrl: string;
  account: Account;
  ward: Ward;
  ticketSet:Ticket[];
}
