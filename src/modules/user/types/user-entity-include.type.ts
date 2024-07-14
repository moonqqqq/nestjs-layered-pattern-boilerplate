import { Prisma } from '@prisma/client';

export const userQueryIncludeStatement = {
  userProfile: {
    include: {
      profileImage: true,
    },
  },
} as const;

export type TUserQueryIncludeStatement = Prisma.UserEntityGetPayload<{
  include: typeof userQueryIncludeStatement;
}>;
