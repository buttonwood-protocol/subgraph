import { Transfer, } from '../../generated/templates/TrancheTemplate/Tranche';
import { fetchAccountBalance } from '../utils/accountBalance';
import { isNullAddress } from '../utils';
import { fetchAccount } from '../utils/account';

export function handleTransfer(event: Transfer): void {
  const from = event.params.from;
  const to = event.params.to;
  const tokenId = event.address.toHexString();
  const amount = event.params.value;

  if (!isNullAddress(from)) {
    let fromAccount = fetchAccount(from.toHexString());
    let fromAccountBalance = fetchAccountBalance(fromAccount.id, tokenId);
    fromAccountBalance.amount = fromAccountBalance.amount.minus(amount);
    fromAccountBalance.block = event.block.number;
    fromAccountBalance.modified = event.block.timestamp;
    fromAccountBalance.transaction = event.transaction.hash;
    fromAccountBalance.save();
  }

  if (!isNullAddress(to)) {
    let toAccount = fetchAccount(to.toHexString());
    let toAccountBalance = fetchAccountBalance(toAccount.id, tokenId);
    toAccountBalance.amount = toAccountBalance.amount.plus(amount);
    toAccountBalance.block = event.block.number;
    toAccountBalance.modified = event.block.timestamp;
    toAccountBalance.transaction = event.transaction.hash;
    toAccountBalance.save();
  }
}
