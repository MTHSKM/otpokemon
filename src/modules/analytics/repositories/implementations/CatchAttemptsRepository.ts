import { DataSource, Repository } from 'typeorm';
import { CatchAttempts } from '../../infra/typeorm/CatchAttempts';
import { ICatchAttemptsRepository } from '../models/ICatchAttemptsRepository';
import { ICreateCatchAttemptDTO } from '../../dtos/ICreateCatchAttemptDTO';

export class CatchAttemptsRepository implements ICatchAttemptsRepository {
  private ormRepository: Repository<CatchAttempts>;

  constructor(postgresDataSource: DataSource) {
    this.ormRepository = postgresDataSource.getRepository(CatchAttempts);
  }

  async findByPokemonAndBall(
    pokemonId: string,
    pokeballId: string,
  ): Promise<CatchAttempts | null> {
    return this.ormRepository.findOne({
      where: { pokemon_id: pokemonId, pokeball_id: pokeballId },
      relations: ['pokemon', 'pokeball'],
    });
  }

  async createOrIncrement({
    pokemon_id,
    pokeball_id,
    throws,
    catches,
  }: ICreateCatchAttemptDTO): Promise<void> {
    const existing = await this.findByPokemonAndBall(pokemon_id, pokeball_id);

    if (existing) {
      existing.total_throws = throws;
      existing.total_catches = catches;
      await this.ormRepository.save(existing);
    } else {
      const newAttempt = this.ormRepository.create({
        pokemon_id,
        pokeball_id,
        total_throws: throws,
        total_catches: catches,
      });
      await this.ormRepository.save(newAttempt);
    }
  }

  async getStatsByPokemon(pokemonId: string): Promise<CatchAttempts[]> {
    return this.ormRepository.find({
      where: { pokemon_id: pokemonId },
      relations: ['pokeball'],
      order: { total_throws: 'DESC' },
    });
  }
}
