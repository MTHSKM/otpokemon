import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from '../../../../../shared/infra/containers';
import { generateSlug } from '../../../../../shared/utils/generateSlug';
import { RegisterAttemptService } from '../../../services/RegisterCatchAttempService';
import { RegisterCatchAttemptBody } from '../schemas/bodies/registerCatchAttemptsBodyScheam';

interface IRequest extends FastifyRequest {
  body: RegisterCatchAttemptBody;
}

export async function registerCatchAttempHandler(
  request: IRequest,
  reply: FastifyReply,
) {
  const { pokemon_slug, pokeball_slug, throws, catches } = request.body;

  const registerAttemptService = container.resolve<RegisterAttemptService>(
    'registerAttemptService',
  );

  await registerAttemptService.execute({
    pokemon_slug: generateSlug(pokemon_slug),
    pokeball_slug: generateSlug(pokeball_slug),
    throws,
    catches,
  });

  return reply.send();
}
