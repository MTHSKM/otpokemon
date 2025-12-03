import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { version } from './../../../../package.json';
import { catalogRouter } from '../../../modules/catalog/infra/http/routes/catalog.routes';
import { analyticsRouter } from '../../../modules/analytics/infra/http/routes/analytics.routes';
import { intelligenceRouter } from '../../../modules/intelligence/infra/http/routes/intelligence.routes';

const app = fastify({
  trustProxy: process.env.NODE_ENV === 'prod',
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'OTPOKEMON',
      version,
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: '/otpokemon',
  staticCSP: true,
});

app.get('/health', async (_request, reply) => reply.send());

app.register(catalogRouter);
app.register(analyticsRouter);
app.register(intelligenceRouter, { prefix: 'intelligence' });

export { app };
