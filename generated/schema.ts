// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Factory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Factory entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Factory entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Factory", id.toString(), this);
  }

  static load(id: string): Factory | null {
    return store.get("Factory", id) as Factory | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bondCount(): BigInt {
    let value = this.get("bondCount");
    return value.toBigInt();
  }

  set bondCount(value: BigInt) {
    this.set("bondCount", Value.fromBigInt(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Token entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Token entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Token", id.toString(), this);
  }

  static load(id: string): Token | null {
    return store.get("Token", id) as Token | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }
}

export class Tranche extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Tranche entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Tranche entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Tranche", id.toString(), this);
  }

  static load(id: string): Tranche | null {
    return store.get("Tranche", id) as Tranche | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bond(): string {
    let value = this.get("bond");
    return value.toString();
  }

  set bond(value: string) {
    this.set("bond", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get ratio(): BigDecimal {
    let value = this.get("ratio");
    return value.toBigDecimal();
  }

  set ratio(value: BigDecimal) {
    this.set("ratio", Value.fromBigDecimal(value));
  }

  get index(): BigInt {
    let value = this.get("index");
    return value.toBigInt();
  }

  set index(value: BigInt) {
    this.set("index", Value.fromBigInt(value));
  }

  get totalCollateral(): BigInt {
    let value = this.get("totalCollateral");
    return value.toBigInt();
  }

  set totalCollateral(value: BigInt) {
    this.set("totalCollateral", Value.fromBigInt(value));
  }

  get totalCollateralAtMaturity(): BigInt {
    let value = this.get("totalCollateralAtMaturity");
    return value.toBigInt();
  }

  set totalCollateralAtMaturity(value: BigInt) {
    this.set("totalCollateralAtMaturity", Value.fromBigInt(value));
  }

  get totalSupplyAtMaturity(): BigInt {
    let value = this.get("totalSupplyAtMaturity");
    return value.toBigInt();
  }

  set totalSupplyAtMaturity(value: BigInt) {
    this.set("totalSupplyAtMaturity", Value.fromBigInt(value));
  }
}

export class Bond extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Bond entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Bond entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Bond", id.toString(), this);
  }

  static load(id: string): Bond | null {
    return store.get("Bond", id) as Bond | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get depositLimit(): BigInt {
    let value = this.get("depositLimit");
    return value.toBigInt();
  }

  set depositLimit(value: BigInt) {
    this.set("depositLimit", Value.fromBigInt(value));
  }

  get owners(): Array<string | null> {
    let value = this.get("owners");
    return value.toStringArray();
  }

  set owners(value: Array<string | null>) {
    this.set("owners", Value.fromStringArray(value));
  }

  get collateral(): string {
    let value = this.get("collateral");
    return value.toString();
  }

  set collateral(value: string) {
    this.set("collateral", Value.fromString(value));
  }

  get tranches(): Array<string | null> {
    let value = this.get("tranches");
    return value.toStringArray();
  }

  set tranches(value: Array<string | null>) {
    this.set("tranches", Value.fromStringArray(value));
  }

  get maturityDate(): BigInt {
    let value = this.get("maturityDate");
    return value.toBigInt();
  }

  set maturityDate(value: BigInt) {
    this.set("maturityDate", Value.fromBigInt(value));
  }

  get maturedDate(): BigInt {
    let value = this.get("maturedDate");
    return value.toBigInt();
  }

  set maturedDate(value: BigInt) {
    this.set("maturedDate", Value.fromBigInt(value));
  }

  get isMature(): boolean {
    let value = this.get("isMature");
    return value.toBoolean();
  }

  set isMature(value: boolean) {
    this.set("isMature", Value.fromBoolean(value));
  }

  get totalDebt(): BigInt {
    let value = this.get("totalDebt");
    return value.toBigInt();
  }

  set totalDebt(value: BigInt) {
    this.set("totalDebt", Value.fromBigInt(value));
  }

  get totalDebtAtMaturity(): BigInt {
    let value = this.get("totalDebtAtMaturity");
    return value.toBigInt();
  }

  set totalDebtAtMaturity(value: BigInt) {
    this.set("totalDebtAtMaturity", Value.fromBigInt(value));
  }

  get totalCollateral(): BigInt {
    let value = this.get("totalCollateral");
    return value.toBigInt();
  }

  set totalCollateral(value: BigInt) {
    this.set("totalCollateral", Value.fromBigInt(value));
  }

  get totalCollateralAtMaturity(): BigInt {
    let value = this.get("totalCollateralAtMaturity");
    return value.toBigInt();
  }

  set totalCollateralAtMaturity(value: BigInt) {
    this.set("totalCollateralAtMaturity", Value.fromBigInt(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Account entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Account entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Account", id.toString(), this);
  }

  static load(id: string): Account | null {
    return store.get("Account", id) as Account | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get balances(): Array<string> {
    let value = this.get("balances");
    return value.toStringArray();
  }

  set balances(value: Array<string>) {
    this.set("balances", Value.fromStringArray(value));
  }
}

export class AccountBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save AccountBalance entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AccountBalance entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AccountBalance", id.toString(), this);
  }

  static load(id: string): AccountBalance | null {
    return store.get("AccountBalance", id) as AccountBalance | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get tranche(): string {
    let value = this.get("tranche");
    return value.toString();
  }

  set tranche(value: string) {
    this.set("tranche", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get block(): BigInt | null {
    let value = this.get("block");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set block(value: BigInt | null) {
    if (value === null) {
      this.unset("block");
    } else {
      this.set("block", Value.fromBigInt(value as BigInt));
    }
  }

  get modified(): BigInt | null {
    let value = this.get("modified");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set modified(value: BigInt | null) {
    if (value === null) {
      this.unset("modified");
    } else {
      this.set("modified", Value.fromBigInt(value as BigInt));
    }
  }

  get transaction(): Bytes | null {
    let value = this.get("transaction");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set transaction(value: Bytes | null) {
    if (value === null) {
      this.unset("transaction");
    } else {
      this.set("transaction", Value.fromBytes(value as Bytes));
    }
  }
}
