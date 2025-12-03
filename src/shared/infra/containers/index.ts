import { createContainer } from 'awilix';
import { registerDataSources } from './registerDataSource';
import { registerProviders } from './registerProviders';
import { registerServices } from './registerServices';
import { registerRepositories } from './registerRepositories';

const container = createContainer({ injectionMode: 'CLASSIC' });

registerDataSources(container);
registerRepositories(container);
registerProviders(container);
registerServices(container);

export { container };
