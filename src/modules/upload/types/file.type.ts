import { Prisma } from '@prisma/client';

const file = Prisma.validator<Prisma.FileDefaultArgs>()({});

export type TFile = Prisma.FileGetPayload<typeof file>;
