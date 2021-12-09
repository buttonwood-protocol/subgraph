import { Address, BigInt, DataSourceContext } from "@graphprotocol/graph-ts";
import { BondCreated } from "../../generated/BondFactory/BondFactory";
import { BondTemplate, TrancheTemplate, RebasingTokenTemplate } from "../../generated/templates";
import { Bond, Factory } from "../../generated/schema";
import { fetchMaturityDate, fetchCollateralTokenAddress, fetchTranche, fetchTrancheCount } from "../utils/bond";
import { buildToken } from "../utils/token";
import { ZERO_BI } from "../utils/constants";

export function handleBondCreated(event: BondCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let factory = Factory.load(event.address.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (factory == null) {
    factory = new Factory(event.address.toHex());

    // Entity fields can be set using simple assignments
    factory.bondCount = BigInt.fromI32(0);
  }

  factory.bondCount = factory.bondCount.plus(BigInt.fromI32(1));

  // Entity fields can be set based on event parameters
  let bondAddress = event.params.newBondAddress;
  let bond = buildBond(bondAddress);
  bond.owners = [event.transaction.from.toHexString()];

  bond.save();
  BondTemplate.create(bondAddress);
  factory.save();
}

/**
 * Build a bond object from the given address and log event
 */
export function buildBond(bondAddress: Address, creator: Address = null): Bond {
  let bond = new Bond(bondAddress.toHexString());
  bond.isMature = false;
  bond.totalDebt = ZERO_BI;
  bond.totalCollateral = ZERO_BI;
  bond.maturityDate = BigInt.fromI32(fetchMaturityDate(bondAddress) as i32);

  if (creator !== null) {
    bond.creator = creator.toHexString();
  }

  let collateralAddress = Address.fromHexString(fetchCollateralTokenAddress(bondAddress)) as Address;
  let collateral = buildToken(collateralAddress);
  bond.collateral = collateral.id;
  collateral.save();

  let collateralContext = new DataSourceContext();
  collateralContext.setString('bond', bond.id);
  RebasingTokenTemplate.createWithContext(collateralAddress, collateralContext);

  let tranches: string[] = [];
  for (let i = 0; i < fetchTrancheCount(bondAddress); i++) {
    let tranche = fetchTranche(bondAddress, bond.collateral, i);
    let trancheToken = buildToken(Address.fromHexString(tranche.id) as Address);

    tranches.push(tranche.id);
    trancheToken.save();
    TrancheTemplate.create(Address.fromHexString(tranche.id) as Address);
    tranche.save();
  }
  bond.tranches = tranches;

  return bond;
}
