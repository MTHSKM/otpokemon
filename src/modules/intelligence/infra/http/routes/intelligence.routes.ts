import { FastifyInstance } from 'fastify';
import {
  GetSingleSuggestionBody,
  getSingleSuggestionBodySchema,
} from '../schemas/bodies/getSingleSuggestionBodySchema';
import { getSingleSuggestionHandler } from '../handler/getSingleSuggestionHandler';
import {
  GetBulkSuggestionBody,
  getBulkSuggestionBodySchema,
} from '../schemas/bodies/getBulkSuggestionBodySchema';
import { getBulkSuggestionHandler } from '../handler/getBulkSuggestionHandler';

export async function intelligenceRouter(app: FastifyInstance) {
  app.post<{ Body: GetSingleSuggestionBody }>(
    '/single',
    {
      schema: { body: getSingleSuggestionBodySchema },
    },
    getSingleSuggestionHandler,
  );

  app.post<{ Body: GetBulkSuggestionBody }>(
    '/bulk',
    { schema: { body: getBulkSuggestionBodySchema } },
    getBulkSuggestionHandler,
  );
}
