import { ICreateCatchAttemptDTO } from '../../dtos/ICreateCatchAttemptDTO';
import { CatchAttempts } from '../../infra/typeorm/CatchAttempts';

export interface ICatchAttemptsRepository {
  findByPokemonAndBall(
    pokemonId: string,
    pokeballId: string,
  ): Promise<CatchAttempts | null>;
  createOrIncrement(data: ICreateCatchAttemptDTO): Promise<void>;
  getStatsByPokemon(pokemonId: string): Promise<CatchAttempts[]>;
}
