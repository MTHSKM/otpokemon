import { Type, Static } from '@sinclair/typebox';

export const registerCatchAttemptBodySchema = Type.Object({
  pokemon_slug: Type.String(),
  pokeball_slug: Type.String(),
  throws: Type.Number({ minimum: 1 }),
  catches: Type.Number({ minimum: 0 }),
});

export type RegisterCatchAttemptBody = Static<
  typeof registerCatchAttemptBodySchema
>;
