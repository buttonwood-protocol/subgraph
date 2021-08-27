import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
    Transfer,
} from "../../generated/templates/TrancheTemplate/Tranche";
import { Account, AccountBalance, Token } from "../../generated/schema";
import { buildToken } from '../utils/token';
import { isNullAddress, toDecimal } from '../utils';

export function handleTransfer(event: Transfer): void {
    let from = event.params.from;
    let to = event.params.to;
    let token = Token.load(event.address.toHex())

    if (!token) {
        token = buildToken(event.address);
        token.save();
    }

    let amount = toDecimal(event.params.value, token.decimals.toI32());

    if (!isNullAddress(from)) {
        let fromAccount = getOrCreateAccount(from);
        let fromAccountBalance = getOrCreateAccountBalance(fromAccount, token!);
        fromAccountBalance.amount = fromAccountBalance.amount.minus(amount);
        fromAccountBalance.block = event.block.number
        fromAccountBalance.modified = event.block.timestamp
        fromAccountBalance.transaction = event.transaction.hash
        fromAccountBalance.save();
        fromAccount.save();
    }

    if (!isNullAddress(to)) {
        let toAccount = getOrCreateAccount(to);
        let toAccountBalance = getOrCreateAccountBalance(toAccount, token!);
        toAccountBalance.amount = toAccountBalance.amount.plus(amount);
        toAccountBalance.block = event.block.number
        toAccountBalance.modified = event.block.timestamp
        toAccountBalance.transaction = event.transaction.hash
        toAccountBalance.save();
        toAccount.save();
    }
}

export function getOrCreateAccount(accountAddress: Address): Account {
    let id = accountAddress.toHexString();
    let existingAccount = Account.load(id);

    if (existingAccount !== null) {
        return existingAccount!;
    }

    let newAccount = new Account(id);

    return newAccount
}

export function getOrCreateAccountBalance(account: Account, token: Token): AccountBalance {
    let id = account.id + '-' + token.id;
    let existingBalance = AccountBalance.load(id);

    if (existingBalance !== null) {
        return existingBalance!;
    }

    let newBalance = new AccountBalance(id);
    newBalance.account = account.id;
    newBalance.tranche = token.id;
    newBalance.amount = BigInt.fromI32(0).toBigDecimal()

    return newBalance
}
