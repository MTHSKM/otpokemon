import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from '../../../../../shared/infra/containers';
import { logger } from '../../../../../shared/utils/logger';
import { SyncMallService } from '../../../services/SyncMallService';

export async function syncMallHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  logger.info('[syncMallHandler]', request);

  const syncMallService = container.resolve<SyncMallService>('syncMallService');

  await syncMallService.execute();

  return reply.send({ message: 'Sincronização iniciada com sucesso' });
}
