import { FastifyInstance } from 'fastify';
import {
  RegisterCatchAttemptBody,
  registerCatchAttemptBodySchema,
} from '../schemas/bodies/registerCatchAttemptsBodyScheam';
import { registerCatchAttempHandler } from '../handler/registerCatchAttempHandler';
import {
  RegisterBulkCatchAttemptBody,
  registerBulkCatchAttemptBodySchema,
} from '../schemas/bodies/registerBulkCatchAttemptBodySchema';
import { registerBulkCatchAttemptHandler } from '../handler/registerBulkCatchAttemptHandler';

export async function analyticsRouter(app: FastifyInstance): Promise<void> {
  app.post<{ Body: RegisterCatchAttemptBody }>(
    '/attempts',
    {
      schema: { body: registerCatchAttemptBodySchema },
    },
    registerCatchAttempHandler,
  );

  app.post<{ Body: RegisterBulkCatchAttemptBody }>(
    '/attempts/bulk',
    {
      schema: {
        body: registerBulkCatchAttemptBodySchema,
      },
    },
    registerBulkCatchAttemptHandler,
  );
}
