import { Prisma } from '@prisma/client';

export const emojiReactionQueryIncludeStatement = {};

export type TEmojiReactionQueryIncludeStatement =
  Prisma.EmojiReactionEntityGetPayload<{
    include: typeof emojiReactionQueryIncludeStatement;
  }>;
