import { BigInt } from '@graphprotocol/graph-ts';
import { BondCreated } from '../../generated/BondFactory/BondFactory';
import { BondTemplate } from '../../generated/templates';
import { createBond } from '../utils/bond';
import { fetchFactory } from '../utils/factory';

export function handleBondCreated(event: BondCreated): void {
  const factory = fetchFactory(event.address);
  factory.bondCount = factory.bondCount.plus(BigInt.fromI32(1));
  factory.save();

  const bondAddress = event.params.newBondAddress;
  createBond(bondAddress, event.params.creator);
  BondTemplate.create(bondAddress);
}
