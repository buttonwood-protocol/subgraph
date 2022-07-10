// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewTransmission extends ethereum.Event {
  get params(): NewTransmission__Params {
    return new NewTransmission__Params(this);
  }
}

export class NewTransmission__Params {
  _event: NewTransmission;

  constructor(event: NewTransmission) {
    this._event = event;
  }

  get aggregatorRoundId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get answer(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get transmitter(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get observations(): Array<BigInt> {
    return this._event.parameters[3].value.toBigIntArray();
  }

  get observers(): Bytes {
    return this._event.parameters[4].value.toBytes();
  }

  get rawReportContext(): Bytes {
    return this._event.parameters[5].value.toBytes();
  }
}

export class AccessControlledOffchainAggregator extends ethereum.SmartContract {
  static bind(address: Address): AccessControlledOffchainAggregator {
    return new AccessControlledOffchainAggregator(
      "AccessControlledOffchainAggregator",
      address
    );
  }
}