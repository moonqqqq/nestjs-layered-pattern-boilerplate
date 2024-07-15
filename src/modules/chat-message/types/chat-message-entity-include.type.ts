import { Prisma } from '@prisma/client';
import { userQueryIncludeStatement } from '../../user/types/user-entity-include.type';
import { referringChatMessageQueryIncludeStatement } from './referring-chat-message-entity-include.type';

export const chatMessageQueryIncludeStatement = {
  chatroom: true,
  sticker: {
    include: {
      file: true,
    },
  },
  taggedUsers: {
    include: {
      user: {
        include: {
          ...userQueryIncludeStatement,
        },
      },
    },
  },
  user: {
    include: {
      ...userQueryIncludeStatement,
    },
  },
  referringMessage: {
    include: referringChatMessageQueryIncludeStatement,
  },
} as const;

export type TChatMessageQueryIncludeStatement =
  Prisma.ChatMessageEntityGetPayload<{
    include: typeof chatMessageQueryIncludeStatement;
  }>;