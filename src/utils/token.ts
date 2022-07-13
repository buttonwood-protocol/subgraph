/* eslint-disable prefer-const */
import { ERC20 } from '../../generated/BondFactory/ERC20';
import { ERC20SymbolBytes } from '../../generated/BondFactory/ERC20SymbolBytes';
import { ERC20NameBytes } from '../../generated/BondFactory/ERC20NameBytes';
import { Token } from '../../generated/schema';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import { castToAddress, isNullEthValue } from '.';

export function fetchTokenSymbol(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);
  let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress);

  // try types string and bytes32 for symbol
  let symbolValue = 'unknown';
  let symbolResult = contract.try_symbol();
  if (symbolResult.reverted) {
    let symbolResultBytes = contractSymbolBytes.try_symbol();
    if (!symbolResultBytes.reverted) {
      // for broken pairs that have no symbol function exposed
      if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
        symbolValue = symbolResultBytes.value.toString();
      }
    }
  } else {
    symbolValue = symbolResult.value;
  }

  return symbolValue;
}

export function fetchTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);
  let contractNameBytes = ERC20NameBytes.bind(tokenAddress);

  // try types string and bytes32 for name
  let nameValue = 'unknown';
  let nameResult = contract.try_name();
  if (nameResult.reverted) {
    let nameResultBytes = contractNameBytes.try_name();
    if (!nameResultBytes.reverted) {
      // for broken exchanges that have no name function exposed
      if (!isNullEthValue(nameResultBytes.value.toHexString())) {
        nameValue = nameResultBytes.value.toString();
      }
    }
  } else {
    nameValue = nameResult.value;
  }

  return nameValue;
}

export function createToken(tokenId: string): Token {
  const address = castToAddress(tokenId);
  const token = new Token(tokenId);
  token.symbol = fetchTokenSymbol(address);
  token.name = fetchTokenName(address);
  let erc20 = ERC20.bind(address);
  token.decimals = BigInt.fromI32(erc20.decimals());
  token.totalSupply = erc20.totalSupply();
  token.save();
  return token;
}

export function fetchToken(tokenId: string): Token {
  let token = Token.load(tokenId);
  if (token === null) {
    token = createToken(tokenId);
  }
  return token;
}
