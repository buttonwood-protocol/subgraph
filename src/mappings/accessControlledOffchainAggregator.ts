import { Address, dataSource } from '@graphprotocol/graph-ts';
import { Bond, Tranche } from '../../generated/schema';
import {
  NewTransmission,
} from '../../generated/templates/AccessControlledOffchainAggregatorTemplate/AccessControlledOffchainAggregator';
import { ERC20 } from '../../generated/BondFactory/ERC20';
import { getBond } from './bond';

export function handleNewTransmission(_event: NewTransmission): void {
  let context = dataSource.context();
  let bondAddress = context.getString('bond');
  updateBalances(Address.fromHexString(bondAddress) as Address);
}

function updateBalances(bondAddress: Address): void {
  let bond = updateBondRebase(getBond(bondAddress));
  bond.save();
}

function updateBondRebase(bond: Bond): Bond {
  let bondAddress = Address.fromHexString(bond.id) as Address;
  bond.totalCollateral = ERC20.bind(Address.fromHexString(bond.collateral) as Address).balanceOf(bondAddress);

  let tranches = bond.tranches;
  for (let i = 0; i < tranches.length; i++) {
    let trancheAddress = tranches[i];
    let tranche = Tranche.load(trancheAddress);
    tranche.totalCollateral = ERC20.bind(Address.fromHexString(bond.collateral) as Address).balanceOf(Address.fromHexString(trancheAddress) as Address);
    tranche.save();
  }
  return bond;
}
