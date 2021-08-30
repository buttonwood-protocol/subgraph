import { Address, Bytes } from "@graphprotocol/graph-ts";
import {
  Deposit,
  Mature,
  Redeem,
  RedeemMature,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
} from "../../generated/templates/BondTemplate/BondController";
import { ERC20 } from '../../generated/BondFactory/ERC20';
import { Bond, Tranche, Token } from "../../generated/schema";
import { buildBond } from './bondFactory';
import { BYTES32_ZERO } from '../utils/constants';
import { fetchTotalDebt } from '../utils/bond';

export function handleDeposit(event: Deposit): void {
  let bondAddress = event.address;
  let bond = updateBond(getBond(bondAddress))
  bond.save();
}

export function handleMature(event: Mature): void {
  let bond = updateBond(getBond(event.address))
  bond.isMature = true;
  bond.save();
}

export function handleRedeem(event: Redeem): void {
  let bondAddress = event.address;
  let bond = updateBond(getBond(bondAddress))
  bond.save();
}

export function handleRedeemMature(event: RedeemMature): void {
  let bondAddress = event.address;
  let bond = updateBond(getBond(bondAddress))
  bond.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {
  if (event.params.role === Bytes.fromHexString(BYTES32_ZERO)) {
    let bond = getBond(event.address);
    bond.owners.push(event.params.account.toHexString());
    bond.save();
  }
}

export function handleRoleRevoked(event: RoleRevoked): void {
  if (event.params.role === Bytes.fromHexString(BYTES32_ZERO)) {
    let bond = getBond(event.address);
    bond.owners.splice(bond.owners.indexOf(event.params.account.toHexString(), 1));
    bond.save();
  }
}

export function updateBond(bond: Bond): Bond {
  let bondAddress = Address.fromHexString(bond.id) as Address
  bond.totalDebt = fetchTotalDebt(bondAddress);
  bond.totalCollateral = ERC20.bind(Address.fromHexString(bond.collateral) as Address).balanceOf(bondAddress);
  let collateral = Token.load(bond.collateral);
  collateral.totalSupply = ERC20.bind(Address.fromHexString(bond.collateral) as Address).totalSupply();
  collateral.save();
  
  let tranches = bond.tranches;
  for (let i = 0; i < tranches.length; i++) {
    let trancheAddress = tranches[i];
    let tranche = Tranche.load(trancheAddress);
    let trancheToken = Token.load(trancheAddress);
    trancheToken.totalSupply = ERC20.bind(Address.fromHexString(trancheAddress) as Address).totalSupply();
    trancheToken.save();
    tranche.totalCollateral = ERC20.bind(Address.fromHexString(bond.collateral) as Address).balanceOf(Address.fromHexString(trancheAddress) as Address);
    tranche.save();
  }
  return bond;
}

export function getBond(address: Address): Bond {
  let bond = Bond.load(address.toHexString());

  if (bond !== null) {
      return bond!
  } else {
    return buildBond(address)
  }
}
