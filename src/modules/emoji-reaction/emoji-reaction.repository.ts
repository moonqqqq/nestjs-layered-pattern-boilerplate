import { Injectable } from '@nestjs/common';
import { EmojiReaction } from './domains/emoji-reaction.domain';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { emojiReactionQueryIncludeStatement } from './types/emoji-reaction-entity-include.type';

@Injectable()
export class EmojiReactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<EmojiReaction> {
    const emojiReactionEntity = await this.prisma.emojiReactionEntity.findFirst(
      {
        where: {
          id,
        },
        include: emojiReactionQueryIncludeStatement,
      },
    );

    if (!emojiReactionEntity) return null;

    return EmojiReaction.fromEntity(emojiReactionEntity);
  }
}
