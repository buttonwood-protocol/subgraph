import { Account } from '../../generated/schema';

export function createAccount(accountId: string): Account {
  const account = new Account(accountId);
  account.save();
  return account;
}

export function fetchAccount(accountId: string): Account {
  let account = Account.load(accountId);
  if (account === null) {
    account = createAccount(accountId);
  }
  return account;
}
