import { asClass, AwilixContainer } from 'awilix';
import { PokeballsRepository } from '../../../modules/catalog/repositories/implementations/PokeballsRepository';
import { PokemonsRepository } from '../../../modules/catalog/repositories/implementations/PokemonsRepository';
import { CatchAttemptsRepository } from '../../../modules/analytics/repositories/implementations/CatchAttemptsRepository';

export function registerRepositories(container: AwilixContainer): void {
  container.register(
    'pokeballsRepository',
    asClass(PokeballsRepository, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'pokemonsRepository',
    asClass(PokemonsRepository, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'catchAttemptsRepository',
    asClass(CatchAttemptsRepository, { lifetime: 'SINGLETON' }),
  );
}
