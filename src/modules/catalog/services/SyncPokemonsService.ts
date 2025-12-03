import { logger } from '../../../shared/utils/logger';
import { ICreatePokemonDTO } from '../dtos/ICreatePokemonDTO';
import { ICatalogScraperProvider } from '../providers/models/ICatalogScraperProvider';
import { IPokemonsRepository } from '../repositories/models/IPokemonsRepository';

export class SyncPokemonsService {
  constructor(
    private catalogScraperProvider: ICatalogScraperProvider,
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  async execute() {
    const samPokemons = await this.catalogScraperProvider.getSamPokemons();

    if (samPokemons.length === 0) {
      logger.warn(
        '⚠️ [SyncPokemons] Nenhum Pokémon encontrado na Wiki. Verifique o Scraper.',
      );

      return;
    }

    const pokemonsToSave: ICreatePokemonDTO[] = samPokemons.map(p => ({
      name: p.name,
      slug: p.slug,
      sell_price_free: p.sellPriceFree,
      sell_price_vip: p.sellPriceVip,
    }));

    await this.pokemonsRepository.createMany(pokemonsToSave);
  }
}
