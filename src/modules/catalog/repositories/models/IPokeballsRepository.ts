import { ICreatePokeballDTO } from '../../dtos/ICreatePokeballDTO';
import { Pokeballs } from '../../infra/typeorm/Pokeballs';

export interface IPokeballsRepository {
  createMany(data: ICreatePokeballDTO[]): Promise<void>;
  findBySlug(slug: string): Promise<Pokeballs | null>;
  listAll(): Promise<Pokeballs[]>;
}
