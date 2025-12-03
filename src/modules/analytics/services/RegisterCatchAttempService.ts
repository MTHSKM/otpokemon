import { IPokeballsRepository } from '../../catalog/repositories/models/IPokeballsRepository';
import { IPokemonsRepository } from '../../catalog/repositories/models/IPokemonsRepository';
import { ICatchAttemptsRepository } from '../repositories/models/ICatchAttemptsRepository';

interface IRequest {
  pokemon_slug: string;
  pokeball_slug: string;
  throws: number;
  catches: number;
}

export class RegisterAttemptService {
  constructor(
    private catchAttemptsRepository: ICatchAttemptsRepository,
    private pokemonsRepository: IPokemonsRepository,
    private pokeballsRepository: IPokeballsRepository,
  ) {}

  async execute({
    pokemon_slug,
    pokeball_slug,
    throws,
    catches,
  }: IRequest): Promise<void> {
    const pokemon = await this.pokemonsRepository.findBySlug(pokemon_slug);
    if (!pokemon) {
      throw new Error(
        `Pokémon '${pokemon_slug}' não encontrado no catálogo. Rode o sync primeiro.`,
      );
    }

    const pokeball = await this.pokeballsRepository.findBySlug(pokeball_slug);
    if (!pokeball) {
      throw new Error(
        `Pokébola '${pokeball_slug}' não encontrada no catálogo.`,
      );
    }

    await this.catchAttemptsRepository.createOrIncrement({
      pokemon_id: pokemon.id,
      pokeball_id: pokeball.id,
      throws,
      catches,
    });
  }
}
