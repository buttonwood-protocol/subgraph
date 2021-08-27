/* eslint-disable prefer-const */
import { BondController } from "../../generated/templates/BondTemplate/BondController";
import { Tranche } from "../../generated/schema";
import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { ERC20 } from '../../generated/BondFactory/ERC20';
import { ADDRESS_ZERO, ZERO_BI } from "./constants";

export function fetchCollateralTokenAddress(bondAddress: Address): string {
  let contract = BondController.bind(bondAddress);

  let collateralTokenAddress = ADDRESS_ZERO;
  let collateralTokenResult = contract.try_collateralToken();
  if (!collateralTokenResult.reverted) {
    collateralTokenAddress = collateralTokenResult.value.toHexString();
  }

  return collateralTokenAddress;
}

export function fetchTrancheCount(bondAddress: Address): number {
  let contract = BondController.bind(bondAddress);

  let trancheCount = 0;
  let trancheCountResult = contract.try_trancheCount();
  if (!trancheCountResult.reverted) {
    trancheCount = trancheCountResult.value.toI32();
  }

  return trancheCount;
}

export function fetchTotalDebt(bondAddress: Address): BigInt {
  let contract = BondController.bind(bondAddress);

  let totalDebt = ZERO_BI;
  let totalDebtResult = contract.try_totalDebt();
  if (!totalDebtResult.reverted) {
    totalDebt = totalDebtResult.value;
  }

  return totalDebt;
}

export function fetchMaturityDate(bondAddress: Address): number {
  let contract = BondController.bind(bondAddress);

  let maturityDate = 0;
  let maturityDateResult = contract.try_maturityDate();
  if (!maturityDateResult.reverted) {
    maturityDate = maturityDateResult.value.toI32();
  }

  return maturityDate;
}

export function fetchTranche(bondAddress: Address, collateral: string, i: number): Tranche {
  let contract = BondController.bind(bondAddress);

  let tranche: Tranche | null = null;
  let trancheResult = contract.try_tranches(BigInt.fromI32(i as i32));
  if (!trancheResult.reverted) {
    let trancheAddress = trancheResult.value.value0.toHexString();
    tranche = new Tranche(trancheAddress);
    tranche.bond = bondAddress.toHexString();
    tranche.index = BigInt.fromI32(i as i32)
    tranche.token = trancheAddress;
    tranche.ratio = BigDecimal.fromString(trancheResult.value.value1.toString());
    tranche.totalCollateral = ERC20.bind(Address.fromHexString(collateral) as Address).balanceOf(Address.fromHexString(trancheAddress) as Address);
  } else {
    throw new Error("Unable to fetch tranche");
  }

  return tranche!;
}
