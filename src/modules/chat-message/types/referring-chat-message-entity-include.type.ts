import { Prisma } from '@prisma/client';

export const referringChatMessageQueryIncludeStatement = {
  chatroom: true,
  sticker: {
    include: {
      file: true,
    },
  },
} as const;

export type TReferringChatMessageQueryIncludeStatement =
  Prisma.ChatMessageEntityGetPayload<{
    include: typeof referringChatMessageQueryIncludeStatement;
  }>;
