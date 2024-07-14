import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { Sticker } from './domains/sticker.domain';

@Injectable()
export class StickerRepository {
  constructor(private readonly prisma: PrismaService) {}

  private inputStickerQueryIncludeStatement = {
    file: true,
  };

  async findById(id: string): Promise<Sticker> {
    const stickerEntity = await this.prisma.stickerEntity.findFirst({
      where: {
        id,
      },
      include: this.inputStickerQueryIncludeStatement,
    });

    if (!stickerEntity) return null;

    return Sticker.fromEntity(stickerEntity);
  }
}
