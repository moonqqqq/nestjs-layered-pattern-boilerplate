import { Prisma } from '@prisma/client';

export const stickerChatMessageQueryIncludeStatement = {
  chatroom: true,
  sticker: {
    include: {
      file: true,
    },
  },
  user: {
    include: {
      userProfile: {
        include: {
          profileImage: true,
        },
      },
    },
  },
} as const;

export type TStickerChatMessageQueryIncludeStatement =
  Prisma.ChatMessageEntityGetPayload<{
    include: typeof stickerChatMessageQueryIncludeStatement;
  }>;
