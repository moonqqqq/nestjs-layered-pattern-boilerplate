import { Prisma } from '@prisma/client';

export const stickerQueryIncludeStatement = {
  file: true,
};

export type TStickerQueryIncludeStatement = Prisma.StickerEntityGetPayload<{
  include: typeof stickerQueryIncludeStatement;
}>;
