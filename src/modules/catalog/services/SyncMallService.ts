import { ICatalogScraperProvider } from '../providers/models/ICatalogScraperProvider';
import { IPokeballsRepository } from '../repositories/models/IPokeballsRepository';
import { ICreatePokeballDTO } from '../dtos/ICreatePokeballDTO';

export class SyncMallService {
  constructor(
    private catalogScraperProvider: ICatalogScraperProvider,
    private pokeballsRepository: IPokeballsRepository,
  ) {}

  async execute() {
    const mallItems = await this.catalogScraperProvider.getMallItems();

    const pokeballsToSave: ICreatePokeballDTO[] = mallItems
      .filter(
        item =>
          item.category === 'ball' && item.transactionType === 'buy_from_npc',
      )
      .map(item => ({
        name: item.name,
        slug: item.slug,
        price_free: item.priceFree,
        price_vip: item.priceVip,
        catch_rate_multiplier: this.guessMultiplier(item.slug),
      }));

    if (pokeballsToSave.length > 0) {
      await this.pokeballsRepository.createMany(pokeballsToSave);
    }
  }

  private guessMultiplier(slug: string): number {
    if (slug.includes('ultra')) return 4.0;
    if (slug.includes('premier')) return 3.0;
    if (slug.includes('great')) return 2.0;
    return 1.0;
  }
}
