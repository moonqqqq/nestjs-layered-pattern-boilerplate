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
  user: {
    include: {
      ...userQueryIncludeStatement,
    },
  },
  referringChatMessage: {
    include: referringChatMessageQueryIncludeStatement,
  },
  attachment: true,
} as const;

export type TChatMessageQueryIncludeStatement =
  Prisma.ChatMessageEntityGetPayload<{
    include: typeof chatMessageQueryIncludeStatement;
  }>;
