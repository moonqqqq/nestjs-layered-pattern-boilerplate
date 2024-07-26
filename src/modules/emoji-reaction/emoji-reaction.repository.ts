import { Injectable } from '@nestjs/common';
import { EmojiReaction } from './domains/emoji-reaction.domain';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import {
  TEmojiReactionQueryIncludeStatement,
  emojiReactionQueryIncludeStatement,
} from './types/emoji-reaction-entity-include.type';
import { Prisma } from '@prisma/client';

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

  async findByChatMessageIdAndUserId(
    chatMessageId: string,
    userId: string,
  ): Promise<EmojiReaction> {
    const emojiReactionEntity = await this.prisma.emojiReactionEntity.findFirst(
      {
        where: {
          userId,
          chatMessageId,
        },
        include: emojiReactionQueryIncludeStatement,
      },
    );

    if (!emojiReactionEntity) return null;

    return EmojiReaction.fromEntity(emojiReactionEntity);
  }

  async save(emojiReaction: EmojiReaction) {
    const emojiReactionInput: Prisma.EmojiReactionEntityCreateInput = {
      userId: emojiReaction.userId,
      type: emojiReaction.type,
      chatMessage: {
        connect: {
          id: emojiReaction.getChatMessageId(),
        },
      },
    };

    // update or create
    let emojiEntity: TEmojiReactionQueryIncludeStatement;
    if (emojiReaction.getId()) {
      // update
      emojiEntity = await this.prisma.emojiReactionEntity.update({
        where: {
          id: emojiReaction.getId(),
        },
        data: emojiReactionInput,
        include: emojiReactionQueryIncludeStatement,
      });
    } else {
      // create
      emojiEntity = await this.prisma.emojiReactionEntity.create({
        data: emojiReactionInput,
        include: emojiReactionQueryIncludeStatement,
      });
    }

    return EmojiReaction.fromEntity(emojiEntity);
  }
}
