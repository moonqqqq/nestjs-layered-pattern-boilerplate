import { Prisma } from '@prisma/client';
import { userQueryIncludeStatement } from '../../user/types/user-entity-include.type';

export const textMessageQueryIncludeStatement = {
  chatroom: true,
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
} as const;

export type TTextMessageQueryIncludeStatement =
  Prisma.ChatMessageEntityGetPayload<{
    include: typeof textMessageQueryIncludeStatement;
  }>;
