export const EMOJI_REACTION = {
  SMILE: 'SMILE',
  CRYING: 'CRYING',
} as const;

export type TEMOJI_REACTION =
  (typeof EMOJI_REACTION)[keyof typeof EMOJI_REACTION];
