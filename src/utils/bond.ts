/* eslint-disable prefer-const */
import { Address, BigInt, DataSourceContext } from '@graphprotocol/graph-ts';
import { BondController, Mature } from '../../generated/templates/BondTemplate/BondController';
import { Bond } from '../../generated/schema';
import {
  AccessControlledOffchainAggregatorTemplate,
  RebasingTokenTemplate,
  TrancheTemplate
} from '../../generated/templates';
import { ERC20 } from '../../generated/BondFactory/ERC20';
import { EACAggregatorProxy } from '../../generated/BondFactory/EACAggregatorProxy';
import { ButtonToken } from '../../generated/BondFactory/ButtonToken';
import { ChainlinkOracle } from '../../generated/BondFactory/ChainlinkOracle';
import { WamplOracle } from '../../generated/BondFactory/WamplOracle';
import { ADDRESS_ZERO, ZERO_BI } from './constants';
import { castToAddress } from './index';
import { createToken, fetchToken } from './token';
import { createTranche, fetchTranche } from './tranche';

function fetchCollateralTokenAddress(bondAddress: Address): Address {
  let contract = BondController.bind(bondAddress);

  let collateralTokenResult = contract.try_collateralToken();
  if (!collateralTokenResult.reverted) {
    return collateralTokenResult.value;
  }

  return castToAddress(ADDRESS_ZERO);
}

function fetchTrancheCount(bondAddress: Address): number {
  let contract = BondController.bind(bondAddress);

  let trancheCount = 0;
  let trancheCountResult = contract.try_trancheCount();
  if (!trancheCountResult.reverted) {
    trancheCount = trancheCountResult.value.toI32();
  }

  return trancheCount;
}

function fetchTotalDebt(bondAddress: Address): BigInt {
  let contract = BondController.bind(bondAddress);

  let totalDebt = ZERO_BI;
  let totalDebtResult = contract.try_totalDebt();
  if (!totalDebtResult.reverted) {
    totalDebt = totalDebtResult.value;
  }

  return totalDebt;
}

function fetchMaturityDate(bondAddress: Address): BigInt {
  let contract = BondController.bind(bondAddress);

  let maturityDate = ZERO_BI;
  let maturityDateResult = contract.try_maturityDate();
  if (!maturityDateResult.reverted) {
    maturityDate = maturityDateResult.value;
  }

  return maturityDate;
}

function fetchDepositLimit(bondAddress: Address): BigInt {
  let contract = BondController.bind(bondAddress);

  let depositLimit = ZERO_BI;
  let depositLimitResult = contract.try_depositLimit();
  if (!depositLimitResult.reverted) {
    depositLimit = depositLimitResult.value;
  }

  return depositLimit;
}

function tryCreateAccessControlledOffchainAggregator(oracleProxyAddress: Address, bondId: string): void {
  let aggregatorResult = EACAggregatorProxy.bind(oracleProxyAddress).try_aggregator();
  if (!aggregatorResult.reverted) {
    let context = new DataSourceContext();
    context.setString('bond', bondId);
    AccessControlledOffchainAggregatorTemplate.createWithContext(aggregatorResult.value, context);
  }
}

function initialiseElasticTokenUpdaters(collateralAddress: Address, bondId: string): void {
  // Handle collateral tokens that have rebases periodically instigated, eg. AMPL
  let collateralContext = new DataSourceContext();
  collateralContext.setString('bond', bondId);
  RebasingTokenTemplate.createWithContext(collateralAddress, collateralContext);

  // Handle collateral tokens that constantly rebase passively, eg. ButtonTokens
  let buttonTokenOracleResult = ButtonToken.bind(collateralAddress).try_oracle();
  if (!buttonTokenOracleResult.reverted) {
    let buttonTokenOracleAddress = buttonTokenOracleResult.value;
    let chainlinkOracleOracleResult = ChainlinkOracle.bind(buttonTokenOracleAddress).try_oracle();
    if (!chainlinkOracleOracleResult.reverted) {
      tryCreateAccessControlledOffchainAggregator(chainlinkOracleOracleResult.value, bondId);
    } else {
      let wamplOracleAmplEthOracleResult = WamplOracle.bind(buttonTokenOracleAddress).try_amplEthOracle();
      let wamplOracleEthUsdOracleResult = WamplOracle.bind(buttonTokenOracleAddress).try_ethUsdOracle();
      if (!wamplOracleAmplEthOracleResult.reverted && !wamplOracleEthUsdOracleResult.reverted) {
        tryCreateAccessControlledOffchainAggregator(wamplOracleAmplEthOracleResult.value, bondId);
        tryCreateAccessControlledOffchainAggregator(wamplOracleEthUsdOracleResult.value, bondId);
      } else {
        // Unrecognised oracle type, give up
      }
    }
  }
}

export function createBond(bondAddress: Address, creatorAddress: Address): Bond {
  const bondId = bondAddress.toHexString();
  let bond = new Bond(bondId);
  bond.creator = creatorAddress.toHexString();
  bond.owner = bond.creator;
  bond.isMature = false;
  bond.totalDebt = ZERO_BI;
  bond.totalCollateral = ZERO_BI;
  bond.maturityDate = fetchMaturityDate(bondAddress);
  bond.depositLimit = fetchDepositLimit(bondAddress);
  bond.feeBps = ZERO_BI;

  const collateralAddress = fetchCollateralTokenAddress(bondAddress);
  const collateral = fetchToken(collateralAddress.toHexString());
  bond.collateral = collateral.id;

  const tranches: string[] = [];
  for (let trancheIndex = 0; trancheIndex < fetchTrancheCount(bondAddress); trancheIndex++) {
    const tranche = createTranche(bondId, bond.collateral, trancheIndex);
    createToken(tranche.id);
    tranches.push(tranche.id);
    TrancheTemplate.create(castToAddress(tranche.id));
  }
  bond.tranches = tranches;

  initialiseElasticTokenUpdaters(collateralAddress, bond.id);

  bond.save();
  return bond;
}

export function fetchBond(bondId: string): Bond {
  let bond = Bond.load(bondId);
  if (bond === null) {
    throw new Error('Could not retrieve Bond');
  }
  return bond;
}

export function updateBondAfterRebase(bondId: string): void {
  const bond = fetchBond(bondId);
  let bondAddress = castToAddress(bond.id);
  let collateralAddress = castToAddress(bond.collateral);
  bond.totalCollateral = ERC20.bind(collateralAddress).balanceOf(bondAddress);

  let tranches = bond.tranches;
  for (let trancheIndex = 0; trancheIndex < tranches.length; trancheIndex++) {
    const trancheId = tranches[trancheIndex];
    const trancheAddress = castToAddress(trancheId);
    const tranche = fetchTranche(trancheId);
    tranche.totalCollateral = ERC20.bind(collateralAddress).balanceOf(trancheAddress);
    tranche.save();
  }
  bond.save();
}

export function updateBond(bond: Bond): void {
  const bondAddress = castToAddress(bond.id);
  const collateralAddress = castToAddress(bond.collateral);
  bond.totalDebt = fetchTotalDebt(bondAddress);
  bond.totalCollateral = ERC20.bind(collateralAddress).balanceOf(bondAddress);
  const collateral = fetchToken(bond.collateral);
  collateral.totalSupply = ERC20.bind(collateralAddress).totalSupply();
  collateral.save();

  let tranches = bond.tranches;
  for (let trancheIndex = 0; trancheIndex < tranches.length; trancheIndex++) {
    const trancheId = tranches[trancheIndex];
    const trancheAddress = castToAddress(trancheId);
    const tranche = fetchTranche(trancheId);
    const trancheToken = fetchToken(trancheId);
    trancheToken.totalSupply = ERC20.bind(trancheAddress).totalSupply();
    trancheToken.save();
    tranche.totalCollateral = ERC20.bind(collateralAddress).balanceOf(trancheAddress);
    tranche.save();
  }
  bond.save();
}

export function matureBond(bond: Bond, event: Mature): void {
  bond.isMature = true;
  bond.maturedDate = event.block.timestamp;
  bond.totalDebtAtMaturity = bond.totalDebt;

  const tranches = bond.tranches;
  let totalCollateralAtMaturity = ZERO_BI;
  for (let trancheIndex = 0; trancheIndex < tranches.length; trancheIndex++) {
    const trancheId = tranches[trancheIndex];
    const tranche = fetchTranche(trancheId);
    const trancheToken = fetchToken(trancheId);
    tranche.totalSupplyAtMaturity = trancheToken.totalSupply;
    tranche.totalCollateralAtMaturity = tranche.totalCollateral;
    // bond.totalCollateral is 0 after maturity is called so compute this from values the tranches now have
    totalCollateralAtMaturity = totalCollateralAtMaturity.plus(tranche.totalCollateral);
    tranche.save();
  }
  bond.totalCollateralAtMaturity = totalCollateralAtMaturity;
  bond.save();
}
