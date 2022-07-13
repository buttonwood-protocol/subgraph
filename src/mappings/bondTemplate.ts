import {
  Deposit,
  FeeUpdate,
  Mature,
  OwnershipTransferred,
  Redeem,
  RedeemMature,
} from '../../generated/templates/BondTemplate/BondController';
import { fetchBond, matureBond, updateBond } from '../utils/bond';

export function handleDeposit(event: Deposit): void {
  const bond = fetchBond(event.address.toHexString());
  updateBond(bond);
}

export function handleRedeem(event: Redeem): void {
  const bond = fetchBond(event.address.toHexString());
  updateBond(bond);
}

export function handleRedeemMature(event: RedeemMature): void {
  const bond = fetchBond(event.address.toHexString());
  updateBond(bond);
}

export function handleMature(event: Mature): void {
  const bond = fetchBond(event.address.toHexString());
  updateBond(bond);
  matureBond(bond, event);
}

export function handleFeeUpdate(event: FeeUpdate): void {
  const bond = fetchBond(event.address.toHexString());
  bond.feeBps = event.params.newFee;
  bond.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const bond = fetchBond(event.address.toHexString());
  bond.owner = event.params.newOwner.toHexString();
  bond.save();
}
