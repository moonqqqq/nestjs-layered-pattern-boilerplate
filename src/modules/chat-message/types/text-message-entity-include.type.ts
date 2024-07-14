import { Prisma } from '@prisma/client';

export const textMessageQueryIncludeStatement = {
  chatroom: true,
  taggedUsers: {
    include: {
      user: {
        include: {
          userProfile: {
            include: {
              profileImage: true,
            },
          },
        },
      },
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

export type TTextMessageQueryIncludeStatement =
  Prisma.ChatMessageEntityGetPayload<{
    include: typeof textMessageQueryIncludeStatement;
  }>;
