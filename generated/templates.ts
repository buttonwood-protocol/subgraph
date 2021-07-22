// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { Address, DataSourceTemplate, DataSourceContext } from "@graphprotocol/graph-ts";

export class BondController extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("BondController", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext("BondController", [address.toHex()], context);
  }
}

export class Tranche extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("Tranche", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext("Tranche", [address.toHex()], context);
  }
}
