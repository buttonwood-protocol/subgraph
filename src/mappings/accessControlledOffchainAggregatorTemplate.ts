import { dataSource } from '@graphprotocol/graph-ts';
import {
  NewTransmission,
} from '../../generated/templates/AccessControlledOffchainAggregatorTemplate/AccessControlledOffchainAggregator';
import { updateBondAfterRebase } from '../utils/bond';

export function handleNewTransmission(_event: NewTransmission): void {
  const context = dataSource.context();
  const bondId = context.getString('bond');
  updateBondAfterRebase(bondId);
}
