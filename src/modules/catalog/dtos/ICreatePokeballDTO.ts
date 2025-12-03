export interface ICreatePokeballDTO {
  name: string;
  slug: string;
  price_free: number;
  price_vip: number;
  catch_rate_multiplier?: number;
}
