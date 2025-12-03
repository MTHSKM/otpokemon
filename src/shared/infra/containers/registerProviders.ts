import { asClass, AwilixContainer } from 'awilix';
import { CatalogScraperProvider } from '../../../modules/catalog/providers/implementations/CatalogScraperProvider';

export function registerProviders(container: AwilixContainer): void {
  container.register(
    'catalogScraperProvider',
    asClass(CatalogScraperProvider, { lifetime: 'SINGLETON' }),
  );
}
