import { dataSource } from '@graphprotocol/graph-ts';
import { LogRebase, Rebase, } from '../../generated/templates/IRebasingERC20/IRebasingERC20';
import { updateBondAfterRebase } from '../utils/bond';

export function handleRebase(_event: Rebase): void {
  const context = dataSource.context();
  const bondId = context.getString('bond');
  updateBondAfterRebase(bondId);
}

export function handleLogRebase(_event: LogRebase): void {
  const context = dataSource.context();
  const bondId = context.getString('bond');
  updateBondAfterRebase(bondId);
}
