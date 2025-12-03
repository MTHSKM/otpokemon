import { DataSource, Repository } from 'typeorm';
import { Pokeballs } from '../../infra/typeorm/Pokeballs';
import { ICreatePokeballDTO } from '../../dtos/ICreatePokeballDTO';
import { IPokeballsRepository } from '../models/IPokeballsRepository';

export class PokeballsRepository implements IPokeballsRepository {
  private ormRepository: Repository<Pokeballs>;

  constructor(postgresDataSource: DataSource) {
    this.ormRepository = postgresDataSource.getRepository(Pokeballs);
  }

  async createMany(data: ICreatePokeballDTO[]): Promise<void> {
    await this.ormRepository.upsert(data, ['slug']);
  }

  async findBySlug(slug: string): Promise<Pokeballs | null> {
    const pokeball = await this.ormRepository.findOne({
      where: { slug },
    });

    return pokeball;
  }

  async listAll(): Promise<Pokeballs[]> {
    const pokeballs = await this.ormRepository.find();
    return pokeballs;
  }
}
