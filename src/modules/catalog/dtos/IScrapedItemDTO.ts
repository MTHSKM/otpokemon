export interface IScrapedItemDTO {
  name: string;
  slug: string;
  priceFree: number;
  priceVip: number;
  category: 'ball' | 'item' | 'unknown';
  transactionType: 'sell_to_npc' | 'buy_from_npc';
}
