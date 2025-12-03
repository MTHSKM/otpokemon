import { ICreatePokemonDTO } from '../../dtos/ICreatePokemonDTO';
import { Pokemons } from '../../infra/typeorm/Pokemons';

export interface IPokemonsRepository {
  createMany(data: ICreatePokemonDTO[]): Promise<void>;
  findBySlug(slug: string): Promise<Pokemons | null>;
}
