import { Suggestion } from './Suggestion';

export type SuggestionResponse = {
  pokemon: string;
  sell_price: number;
  estimated_base_rate: string;
  status: 'insufficient_data' | 'calculated';
  best_ball?: string;
  suggestions?: Suggestion[];
};
