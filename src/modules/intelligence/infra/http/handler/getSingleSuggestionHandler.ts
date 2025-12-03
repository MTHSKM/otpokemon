import { FastifyReply, FastifyRequest } from 'fastify';
import { GetSingleSuggestionBody } from '../schemas/bodies/getSingleSuggestionBodySchema';
import { container } from '../../../../../shared/infra/containers';
import { GetSingleSuggestionService } from '../../../services/GetSingleSuggestionService';

interface IRequest extends FastifyRequest {
  body: GetSingleSuggestionBody;
}

export async function getSingleSuggestionHandler(
  request: IRequest,
  reply: FastifyReply,
) {
  const { pokemon_slug, is_vip } = request.body;

  const getSingleSuggestionService =
    container.resolve<GetSingleSuggestionService>('getSingleSuggestionService');

  const result = await getSingleSuggestionService.execute({
    pokemon_slug,
    is_vip,
  });

  return reply.status(200).send(result);
}
