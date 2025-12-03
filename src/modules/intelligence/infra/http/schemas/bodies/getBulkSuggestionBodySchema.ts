import { Type, Static } from '@sinclair/typebox';

export const getBulkSuggestionBodySchema = Type.Object({
  pokemon_slugs: Type.Array(Type.String(), { minItems: 1 }),
  is_vip: Type.Optional(Type.Boolean()),
});

export type GetBulkSuggestionBody = Static<typeof getBulkSuggestionBodySchema>;
