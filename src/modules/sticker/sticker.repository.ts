import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { Sticker } from './domains/sticker.domain';
import { stickerQueryIncludeStatement } from './types/sticker-entity-include.type';

@Injectable()
export class StickerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Sticker> {
    const stickerEntity = await this.prisma.stickerEntity.findFirst({
      where: {
        id,
      },
      include: stickerQueryIncludeStatement,
    });

    if (!stickerEntity) return null;

    return Sticker.fromEntity(stickerEntity);
  }
}
