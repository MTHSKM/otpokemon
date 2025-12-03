import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from '../../../../../shared/infra/containers';
import { logger } from '../../../../../shared/utils/logger';
import { SyncPokemonsService } from '../../../services/SyncPokemonsService';

export async function syncPokemonsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  logger.info('[syncPokemonsHandler]', request);

  const syncPokemonsService = container.resolve<SyncPokemonsService>(
    'syncPokemonsService',
  );

  await syncPokemonsService.execute();

  return reply.send({ message: 'Sincronização iniciada com sucesso' });
}
