import { Address } from '@graphprotocol/graph-ts';
import { Factory } from '../../generated/schema';
import { ZERO_BI } from './constants';

export function createFactory(bondFactoryAddress: Address): Factory {
  const factory = new Factory(bondFactoryAddress.toHexString());
  factory.bondCount = ZERO_BI;
  factory.save();
  return factory;
}

export function fetchFactory(bondFactoryAddress: Address): Factory {
  let factory = Factory.load(bondFactoryAddress.toHexString());
  if (factory === null) {
    factory = createFactory(bondFactoryAddress);
  }
  return factory;
}
