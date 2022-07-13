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

export class WamplOracle extends ethereum.SmartContract {
  static bind(address: Address): WamplOracle {
    return new WamplOracle("WamplOracle", address);
  }

  amplEthOracle(): Address {
    let result = super.call("amplEthOracle", "amplEthOracle():(address)", []);

    return result[0].toAddress();
  }

  try_amplEthOracle(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "amplEthOracle",
      "amplEthOracle():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ethUsdOracle(): Address {
    let result = super.call("ethUsdOracle", "ethUsdOracle():(address)", []);

    return result[0].toAddress();
  }

  try_ethUsdOracle(): ethereum.CallResult<Address> {
    let result = super.tryCall("ethUsdOracle", "ethUsdOracle():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}
