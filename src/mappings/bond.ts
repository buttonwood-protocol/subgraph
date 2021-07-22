import { BigInt } from "@graphprotocol/graph-ts";
import {
  Deposit,
  Mature,
  Redeem,
  RedeemMature,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
} from "../../generated/templates/BondController/BondController";
import { Bond } from "../../generated/schema";

export function handleDeposit(event: Deposit): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Bond.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Bond(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }

  // Entity fields can be set based on event parameters
  entity.owner = event.params.from.toHexString();

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.collateralToken(...)
  // - contract.getRoleAdmin(...)
  // - contract.hasRole(...)
  // - contract.isMature(...)
  // - contract.maturityDate(...)
  // - contract.supportsInterface(...)
  // - contract.totalDebt(...)
  // - contract.trancheCount(...)
  // - contract.trancheTokenAddresses(...)
  // - contract.tranches(...)
}

export function handleMature(event: Mature): void {}

export function handleRedeem(event: Redeem): void {}

export function handleRedeemMature(event: RedeemMature): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}
