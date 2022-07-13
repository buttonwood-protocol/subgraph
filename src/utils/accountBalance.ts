import { AccountBalance } from '../../generated/schema';
import { ZERO_BI } from './constants';

export function createAccountBalance(accountId: string, tokenId: string): AccountBalance {
  const accountBalanceId = `${accountId}-${tokenId}`;
  const accountBalance = new AccountBalance(accountBalanceId);
  accountBalance.account = accountId;
  accountBalance.tranche = tokenId;
  accountBalance.amount = ZERO_BI;
  accountBalance.save();
  return accountBalance;
}

export function fetchAccountBalance(accountId: string, tokenId: string): AccountBalance {
  const accountBalanceId = `${accountId}-${tokenId}`;
  let accountBalance = AccountBalance.load(accountBalanceId);
  if (accountBalance === null) {
    accountBalance = createAccountBalance(accountId, tokenId);
  }
  return accountBalance;
}
