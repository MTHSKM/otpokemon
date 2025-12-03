import { BulkSuggestionResponse } from '../types/BulkSuggestionResponse';
import { GetSingleSuggestionService } from './GetSingleSuggestionService';

interface IRequest {
  pokemon_slugs: string[];
  is_vip?: boolean;
}

export class GetBulkSuggestionService {
  constructor(private getSingleSuggestionService: GetSingleSuggestionService) {}

  async execute({
    pokemon_slugs,
    is_vip = false,
  }: IRequest): Promise<BulkSuggestionResponse[]> {
    const results = await Promise.all(
      pokemon_slugs.map(async slug => {
        try {
          return await this.getSingleSuggestionService.execute({
            pokemon_slug: slug,
            is_vip,
          });
        } catch (err) {
          return null;
        }
      }),
    );

    const profitableTargets = results
      .filter(res => res !== null && res.status === 'calculated')
      .map(res => {
        const bestOption = res!.suggestions?.find(s => s.is_recommended);

        if (!bestOption) return null;

        const avgThrows = Number(bestOption.average_throws) || 1;
        const ballPrice = Math.round(bestOption.cost_per_catch / avgThrows);

        return {
          pokemon: res!.pokemon,
          pokemon_price: res!.sell_price,
          best_ball: bestOption.ball_name,
          ball_price: ballPrice,
          projected_profit: bestOption.projected_profit,
          catch_rate: bestOption.catch_rate,
          roi_percent: bestOption.roi_percent,
          profit_per_throw: bestOption.profit_per_throw,
        };
      })
      .filter((item): item is BulkSuggestionResponse => item !== null)
      .sort((a, b) => b.profit_per_throw - a.profit_per_throw);

    return profitableTargets;
  }
}
