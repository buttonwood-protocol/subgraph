import { Transfer, } from '../../generated/templates/TrancheTemplate/Tranche';
import { updateAccountBalance } from '../utils/accountBalance';

export function handleTransfer(event: Transfer): void {
  const from = event.params.from;
  const to = event.params.to;
  const tokenId = event.address.toHexString();
  const amount = event.params.value;

  updateAccountBalance(from, tokenId, amount, event);
  updateAccountBalance(to, tokenId, amount, event);
}
