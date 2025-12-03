import { DataSource, Repository } from 'typeorm';
import { Pokemons } from '../../infra/typeorm/Pokemons';
import { ICreatePokemonDTO } from '../../dtos/ICreatePokemonDTO';
import { IPokemonsRepository } from '../models/IPokemonsRepository';

export class PokemonsRepository implements IPokemonsRepository {
  private ormRepository: Repository<Pokemons>;

  constructor(postgresDataSource: DataSource) {
    this.ormRepository = postgresDataSource.getRepository(Pokemons);
  }

  async createMany(data: ICreatePokemonDTO[]): Promise<void> {
    await this.ormRepository.upsert(data, ['slug']);
  }

  async findBySlug(slug: string): Promise<Pokemons | null> {
    const pokemon = await this.ormRepository.findOne({
      where: { slug },
    });

    return pokemon;
  }
}
