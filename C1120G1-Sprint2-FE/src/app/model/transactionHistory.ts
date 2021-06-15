import {Account} from './account';

export interface TransactionHistory {
  transactionId: number;
  transactionDate: string;
  transactionStatus: number;
  transactionScript: string;
  account: Account;
}
