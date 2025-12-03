import axios from 'axios';
import * as cheerio from 'cheerio';
import { IScrapedItemDTO } from '../../dtos/IScrapedItemDTO';
import { ICatalogScraperProvider } from '../models/ICatalogScraperProvider';
import { IScrapedPokemonDTO } from '../../dtos/IScrapedPokemonDTO';
import { generateSlug } from '../../../../shared/utils/generateSlug';
import { logger } from '../../../../shared/utils/logger';

export class CatalogScraperProvider implements ICatalogScraperProvider {
  async getMallItems(): Promise<IScrapedItemDTO[]> {
    const url = 'https://wiki.otpokemon.com/index.php/Sammy';

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const items: IScrapedItemDTO[] = [];

      let currentTransactionType: IScrapedItemDTO['transactionType'] =
        'buy_from_npc';

      const elements = $('.mw-parser-output').find('img, table.wikitable');

      elements.each((_, el) => {
        const $el = $(el);

        if ($el.is('img')) {
          const src = $el.attr('src') || '';
          const parentHref = $el.parent('a').attr('href') || '';

          if (src.includes('Compra') || parentHref.includes('Compra')) {
            currentTransactionType = 'buy_from_npc';
          } else if (src.includes('Venda') || parentHref.includes('Venda')) {
            currentTransactionType = 'sell_to_npc';
          }
          return;
        }

        if ($el.is('table')) {
          if ($el.find('table').length > 0) {
            return;
          }

          const $rows = $el.find('tr');
          $rows.each((__, row) => {
            const tds = $(row).find('td');
            if (tds.length < 4) return;

            this.extractItemFromRow(
              $,
              tds,
              1,
              2,
              3,
              currentTransactionType,
              items,
            );

            if (tds.length >= 8) {
              this.extractItemFromRow(
                $,
                tds,
                5,
                6,
                7,
                currentTransactionType,
                items,
              );
            }
          });
        }
      });

      return items;
    } catch (error) {
      logger.error('[CatalogScraperProvider] - Erro no Scraper Mall:', error);
    }
  }

  private extractItemFromRow(
    $: cheerio.CheerioAPI,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tds: cheerio.Cheerio<any>,
    nameIdx: number,
    freeIdx: number,
    vipIdx: number,
    type: 'buy_from_npc' | 'sell_to_npc',
    itemsArray: IScrapedItemDTO[],
  ) {
    const name = $(tds[nameIdx]).text().trim();
    const priceFree = this.parsePrice($(tds[freeIdx]).text());
    const priceVip = this.parsePrice($(tds[vipIdx]).text());

    if (!name || (priceFree === 0 && priceVip === 0)) return;
    if (name.toUpperCase().includes('NOME') || name.includes('$ FREE')) return;

    let category: IScrapedItemDTO['category'] = 'item';
    const lowerName = name.toLowerCase();

    const ballNames = ['ball', 'poké ball', 'poke ball'];
    if (ballNames.some(b => lowerName.includes(b))) {
      category = 'ball';
    }

    const slug = generateSlug(name);

    itemsArray.push({
      name,
      slug,
      priceFree,
      priceVip,
      category,
      transactionType: type,
    });
  }

  async getSamPokemons(): Promise<IScrapedPokemonDTO[]> {
    const url = 'https://wiki.otpokemon.com/index.php/Sam';

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const pokemons: IScrapedPokemonDTO[] = [];

      $('table.wikitable tr').each((_, el) => {
        const tds = $(el).find('td');
        if (tds.length < 3) return;

        this.extractPokemonFromRow($, tds, 1, 2, 3, pokemons);

        if (tds.length >= 8) {
          this.extractPokemonFromRow($, tds, 5, 6, 7, pokemons);
        }

        if (tds.length >= 12) {
          this.extractPokemonFromRow($, tds, 9, 10, 11, pokemons);
        }
      });

      return pokemons;
    } catch (error) {
      logger.error('[CatalogScraperProvider] - Erro no Scraper Sam:', error);
    }
  }

  private extractPokemonFromRow(
    $: cheerio.CheerioAPI,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tds: cheerio.Cheerio<any>,
    nameIdx: number,
    freeIdx: number,
    vipIdx: number,
    pokemonsArray: IScrapedPokemonDTO[],
  ) {
    const name = $(tds[nameIdx]).text().trim();
    const priceFree = this.parsePrice($(tds[freeIdx]).text());
    const priceVip = this.parsePrice($(tds[vipIdx]).text());

    if (!name || (priceFree === 0 && priceVip === 0)) return;

    if (name.toUpperCase().includes('NOME') || name.includes('$ FREE')) return;

    const slug = generateSlug(name);

    pokemonsArray.push({
      name,
      slug,
      sellPriceFree: priceFree,
      sellPriceVip: priceVip,
    });
  }

  private parsePrice(text: string): number {
    const clean = text.replace(/\D/g, '');
    return clean ? parseInt(clean, 10) : 0;
  }
}
