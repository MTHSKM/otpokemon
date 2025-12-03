import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from '../../../../../shared/infra/containers';
import { generateSlug } from '../../../../../shared/utils/generateSlug';
import { RegisterBulkCatchAttemptService } from '../../../services/RegisterBulkCatchAttemptService';
import { RegisterCatchAttemptBody } from '../schemas/bodies/registerCatchAttemptsBodyScheam';

interface IRequest extends FastifyRequest {
  body: RegisterCatchAttemptBody[];
}

export async function registerBulkCatchAttemptHandler(
  request: IRequest,
  reply: FastifyReply,
) {
  const attempts = request.body;

  const registerBulkService =
    container.resolve<RegisterBulkCatchAttemptService>(
      'registerBulkCatchAttemptService',
    );

  const requestsWithSlugs = attempts.map(attempt => ({
    pokemon_slug: generateSlug(attempt.pokemon_slug),
    pokeball_slug: generateSlug(attempt.pokeball_slug),
    throws: attempt.throws,
    catches: attempt.catches,
  }));

  await registerBulkService.execute(requestsWithSlugs);

  return reply.status(201).send();
}
