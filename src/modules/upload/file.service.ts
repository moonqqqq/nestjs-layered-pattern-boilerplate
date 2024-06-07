import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}
  async checkIsValidFileId(id: string) {
    const file = await this.prisma.file.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (file) return false;
    return true;
  }
}
