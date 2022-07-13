import { Address, BigInt } from '@graphprotocol/graph-ts';
import { AccountBalance } from '../../generated/schema';
import { ZERO_BI } from './constants';
import { isNullAddress } from './index';
import { fetchAccount } from './account';
import { Transfer } from '../../generated/templates/TrancheTemplate/Tranche';

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

export function updateAccountBalance(accountAddress: Address, tokenId: string, amount: BigInt, event: Transfer): void {
  if (!isNullAddress(accountAddress)) {
    const account = fetchAccount(accountAddress.toHexString());
    const accountBalance = fetchAccountBalance(account.id, tokenId);
    accountBalance.amount = accountBalance.amount.minus(amount);
    accountBalance.block = event.block.number;
    accountBalance.modified = event.block.timestamp;
    accountBalance.transaction = event.transaction.hash;
    accountBalance.save();
  }
}
