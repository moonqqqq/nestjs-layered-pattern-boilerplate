import { Prisma } from '@prisma/client';

export const chatroomQueryIncludeStatement = {
  members: {
    include: {
      userProfile: {
        include: {
          profileImage: true,
        },
      },
    },
  },
};

export type TChatroomQueryIncludeStatement = Prisma.ChatroomEntityGetPayload<{
  include: typeof chatroomQueryIncludeStatement;
}>;
