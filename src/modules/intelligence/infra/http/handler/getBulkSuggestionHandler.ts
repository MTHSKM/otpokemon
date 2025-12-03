import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from '../../../../../shared/infra/containers';
import { GetBulkSuggestionBody } from '../schemas/bodies/getBulkSuggestionBodySchema';
import { GetBulkSuggestionService } from '../../../services/GetBulkSuggestionService';

interface IRequest extends FastifyRequest {
  body: GetBulkSuggestionBody;
}

export async function getBulkSuggestionHandler(
  request: IRequest,
  reply: FastifyReply,
) {
  const { pokemon_slugs, is_vip } = request.body;

  const getBulkSuggestionService = container.resolve<GetBulkSuggestionService>(
    'getBulkSuggestionService',
  );

  const result = await getBulkSuggestionService.execute({
    pokemon_slugs,
    is_vip,
  });

  return reply.status(200).send(result);
}
