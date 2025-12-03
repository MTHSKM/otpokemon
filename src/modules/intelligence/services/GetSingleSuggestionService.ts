import { generateSlug } from '../../../shared/utils/generateSlug';
import { ICatchAttemptsRepository } from '../../analytics/repositories/models/ICatchAttemptsRepository';
import { IPokeballsRepository } from '../../catalog/repositories/models/IPokeballsRepository';
import { IPokemonsRepository } from '../../catalog/repositories/models/IPokemonsRepository';
import { Suggestion } from '../types/Suggestion';
import { SuggestionResponse } from '../types/SuggestionResponse';

interface IRequest {
  pokemon_slug: string;
  is_vip?: boolean;
}

export class GetSingleSuggestionService {
  constructor(
    private catchAttemptsRepository: ICatchAttemptsRepository,
    private pokemonsRepository: IPokemonsRepository,
    private pokeballsRepository: IPokeballsRepository,
  ) {}

  async execute({
    pokemon_slug,
    is_vip = false,
  }: IRequest): Promise<SuggestionResponse> {
    const pokemon = await this.pokemonsRepository.findBySlug(
      generateSlug(pokemon_slug),
    );

    if (!pokemon) {
      throw new Error(`Pokémon '${pokemon_slug}' não encontrado.`);
    }

    const sellPrice = is_vip
      ? Number(pokemon.sell_price_vip)
      : Number(pokemon.sell_price_free);

    const stats = await this.catchAttemptsRepository.getStatsByPokemon(
      pokemon.id,
    );

    let totalCatches = 0;
    let totalWeightedThrows = 0;

    stats.forEach(stat => {
      const multiplier = Number(stat.pokeball.catch_rate_multiplier) || 1;
      totalCatches += stat.total_catches;
      totalWeightedThrows += stat.total_throws * multiplier;
    });

    if (totalWeightedThrows < 50 || totalCatches === 0) {
      return {
        pokemon: pokemon.name,
        sell_price: sellPrice,
        estimated_base_rate: '?',
        status: 'insufficient_data',
      };
    }

    const estimatedBaseRate = totalCatches / totalWeightedThrows;

    const allBalls = await this.pokeballsRepository.listAll();

    const suggestions: Suggestion[] = allBalls.map(ball => {
      const multiplier = Number(ball.catch_rate_multiplier);
      const buyPrice = is_vip
        ? Number(ball.price_vip)
        : Number(ball.price_free);

      let projectedRate = estimatedBaseRate * multiplier;
      if (projectedRate > 1) projectedRate = 1;

      const avgThrowsNeeded = 1 / projectedRate;
      const costPerCatch = buyPrice * avgThrowsNeeded;

      const profitPerCatch = sellPrice - costPerCatch;

      const profitPerThrow = sellPrice * projectedRate - buyPrice;

      let roi = 0;
      if (costPerCatch > 0) {
        roi = (profitPerCatch / costPerCatch) * 100;
      }

      return {
        ball_name: ball.name,
        catch_rate: (projectedRate * 100).toFixed(2) + '%',
        average_throws: avgThrowsNeeded.toFixed(2),
        cost_per_catch: Number(costPerCatch.toFixed(2)),
        projected_profit: Number(profitPerCatch.toFixed(2)),
        profit_per_throw: Number(profitPerThrow.toFixed(2)),
        roi_percent: roi.toFixed(0) + '%',
        is_recommended: false,
      };
    });

    suggestions.sort((a, b) => b.profit_per_throw - a.profit_per_throw);

    if (suggestions.length > 0 && suggestions[0].projected_profit > 0) {
      suggestions[0].is_recommended = true;
    }

    return {
      pokemon: pokemon.name,
      sell_price: sellPrice,
      estimated_base_rate: (estimatedBaseRate * 100).toFixed(3) + '%',
      status: 'calculated',
      best_ball: suggestions[0]?.ball_name,
      suggestions,
    };
  }
}
