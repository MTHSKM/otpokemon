import { FastifyInstance } from 'fastify';
import { syncMallHandler } from '../handler/syncMallHandler';
import { syncPokemonsHandler } from '../handler/syncPokemonsHandler';

export async function catalogRouter(app: FastifyInstance) {
  app.post('/sync/mall', syncMallHandler);

  app.post('/sync/pokemons', syncPokemonsHandler);
}
