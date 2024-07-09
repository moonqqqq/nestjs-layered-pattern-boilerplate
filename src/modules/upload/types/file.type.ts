import { Prisma } from '@prisma/client';

const file = Prisma.validator<Prisma.FileEntityDefaultArgs>()({});

export type TFile = Prisma.FileEntityGetPayload<typeof file>;
