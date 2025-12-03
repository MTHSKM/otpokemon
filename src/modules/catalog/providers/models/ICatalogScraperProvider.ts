import { IScrapedItemDTO } from '../../dtos/IScrapedItemDTO';
import { IScrapedPokemonDTO } from '../../dtos/IScrapedPokemonDTO';

export interface ICatalogScraperProvider {
  getMallItems(): Promise<IScrapedItemDTO[]>;
  getSamPokemons(): Promise<IScrapedPokemonDTO[]>;
}
