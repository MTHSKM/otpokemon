import { Type, Static } from '@sinclair/typebox';

export const getSingleSuggestionBodySchema = Type.Object({
  pokemon_slug: Type.String(),
  is_vip: Type.Optional(Type.Boolean()),
});

export type GetSingleSuggestionBody = Static<
  typeof getSingleSuggestionBodySchema
>;
