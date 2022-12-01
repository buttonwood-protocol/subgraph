import { Address, BigInt } from '@graphprotocol/graph-ts';
import { BondCreated } from '../../generated/BondFactory/BondFactory';
import { BondTemplate } from '../../generated/templates';
import { acceptedFactoryAddresses } from '../acceptedFactoryAddresses';
import { createBond } from '../utils/bond';
import { fetchFactory } from '../utils/factory';

function isAcceptedFactoryAddress(address: Address): boolean {
  for (let i = 0; i < acceptedFactoryAddresses.length; i++) {
    if (address == acceptedFactoryAddresses[i]) {
      return true;
    }
  }
  return false;
}

export function handleBondCreated(event: BondCreated): void {
  if (!isAcceptedFactoryAddress(event.address)) {
    return;
  }
  const factory = fetchFactory(event.address);
  factory.bondCount = factory.bondCount.plus(BigInt.fromI32(1));
  factory.save();

  const bondAddress = event.params.newBondAddress;
  createBond(event);
  BondTemplate.create(bondAddress);
}
