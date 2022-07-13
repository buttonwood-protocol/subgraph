import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { Tranche } from '../../generated/schema';
import { BondController } from '../../generated/templates/BondTemplate/BondController';
import { castToAddress } from './index';
import { ERC20 } from '../../generated/BondFactory/ERC20';

export function createTranche(bondId: string, collateralId: string, trancheIndex: number): Tranche {
  let contract = BondController.bind(castToAddress(bondId));
  let trancheResult = contract.try_tranches(BigInt.fromI32(trancheIndex as i32));
  if (!trancheResult.reverted) {
    let trancheAddress = trancheResult.value.getToken();
    const trancheId = trancheAddress.toHexString();
    const tranche = new Tranche(trancheId);
    tranche.bond = bondId;
    tranche.index = BigInt.fromI32(trancheIndex as i32);
    tranche.token = trancheId;
    tranche.ratio = BigDecimal.fromString(trancheResult.value.getRatio().toString());
    tranche.totalCollateral = ERC20.bind(castToAddress(collateralId)).balanceOf(trancheAddress);
    tranche.save();
    return tranche;
  } else {
    throw new Error('Unable to fetch tranche');
  }
}

export function fetchTranche(trancheId: string): Tranche {
  let tranche = Tranche.load(trancheId);
  if (tranche === null) {
    throw new Error('Could not retrieve Tranche');
  }
  return tranche;
}
