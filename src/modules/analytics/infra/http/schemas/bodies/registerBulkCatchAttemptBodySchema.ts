import { Type, Static } from '@sinclair/typebox';

export const registerBulkCatchAttemptBodySchema = Type.Array(
  Type.Object({
    pokemon_slug: Type.String(),
    pokeball_slug: Type.String(),
    throws: Type.Number({ minimum: 1 }),
    catches: Type.Number({ minimum: 0 }),
  }),
);

export type RegisterBulkCatchAttemptBody = Static<
  typeof registerBulkCatchAttemptBodySchema
>;
