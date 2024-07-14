import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../share-modules/database/prisma/prisma.service';
import { StickerChatMessage } from '../domains/sticker-chat-message.domain';
import {
  TStickerChatMessageQueryIncludeStatement,
  stickerChatMessageQueryIncludeStatement,
} from '../types/sticker-message-entity-include.type';

@Injectable()
export class StickerChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(stickerChatMessage: StickerChatMessage) {
    const stickerChatMessageInput: Prisma.ChatMessageEntityCreateInput = {
      chatroom: {
        connect: {
          id: stickerChatMessage.chatroomId,
        },
      },
      type: stickerChatMessage.type,
      sticker: {
        connect: {
          id: stickerChatMessage.sticker.getId(),
        },
      },
      user: {
        connect: {
          id: stickerChatMessage.user.id,
        },
      },
    };

    let stickerChatMessageEntity: TStickerChatMessageQueryIncludeStatement;
    if (stickerChatMessage.getChatMessageId()) {
      // update
      stickerChatMessageEntity = await this.prisma.chatMessageEntity.update({
        where: {
          id: stickerChatMessage.getChatMessageId(),
        },
        data: stickerChatMessageInput,
        include: stickerChatMessageQueryIncludeStatement,
      });
    } else {
      // create
      stickerChatMessageEntity = await this.prisma.chatMessageEntity.create({
        data: stickerChatMessageInput,
        include: stickerChatMessageQueryIncludeStatement,
      });
    }

    return StickerChatMessage.fromEntity(stickerChatMessageEntity);
  }
}
