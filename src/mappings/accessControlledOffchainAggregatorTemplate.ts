import { dataSource } from '@graphprotocol/graph-ts';
import {
  AnswerUpdated,
  NewTransmission,
} from '../../generated/templates/AccessControlledOffchainAggregatorTemplate/AccessControlledOffchainAggregator';
import { updateBondAfterRebase } from '../utils/bond';

export function handleNewTransmission(_event: NewTransmission): void {
  const context = dataSource.context();
  const bondId = context.getString('bond');
  updateBondAfterRebase(bondId);
}

export function handleAnswerUpdated(_event: AnswerUpdated): void {
  const context = dataSource.context();
  const bondId = context.getString('bond');
  updateBondAfterRebase(bondId);
}
