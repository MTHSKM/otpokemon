import { asValue, AwilixContainer } from 'awilix';
import { postgresDataSource } from '../database/potsgresDataSource';

export function registerDataSources(container: AwilixContainer): void {
  container.register('postgresDataSource', asValue(postgresDataSource));
}
