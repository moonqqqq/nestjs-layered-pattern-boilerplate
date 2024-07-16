import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../share-modules/database/prisma/prisma.service';
import { TextChatMessage } from '../domains/text-chat-message.domain';
import { StickerChatMessage } from '../domains/sticker-chat-message.domain';
import { CHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import {
  TChatMessageQueryIncludeStatement,
  chatMessageQueryIncludeStatement,
} from '../types/chat-message-entity-include.type';
import { ReferringChatMessage } from '../domains/referring-chat-message.domain';
import { referringChatMessageQueryIncludeStatement } from '../types/referring-chat-message-entity-include.type';
import { INFINITE_SCROLL } from '../../../custom-utils/pagination/constants/infinite-scroll.constant';

@Injectable()
export class ChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByChatroomId(
    currentUserId: string,
    chatroomId: string,
    lastItemCreatedAt: Date,
  ) {
    const chatMessageEntities = await this.prisma.chatMessageEntity.findMany({
      where: {
        chatroomId,
        chatroom: {
          members: {
            some: {
              id: currentUserId,
            },
          },
        },
        createdAt: {
          lt: lastItemCreatedAt,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: INFINITE_SCROLL.DEFAULT_COUNT_PER_PAGE + 1,
      include: chatMessageQueryIncludeStatement,
    });

    const hasNext =
      chatMessageEntities.length > INFINITE_SCROLL.DEFAULT_COUNT_PER_PAGE;
    const results = hasNext
      ? chatMessageEntities.slice(0, -1)
      : chatMessageEntities;

    const chatMessages = results.reverse().map((chatMessageEntity) => {
      return chatMessageEntity.type === CHAT_MESSAGE_KIND.TEXT
        ? TextChatMessage.fromEntity(chatMessageEntity)
        : StickerChatMessage.fromEntity(chatMessageEntity);
    });

    return {
      hasNext,
      chatMessages,
    };
  }

  async findById(
    chatMessageId: string,
  ): Promise<TextChatMessage | StickerChatMessage> {
    const chatMessage = await this.prisma.chatMessageEntity.findFirst({
      where: {
        id: chatMessageId,
      },
      include: chatMessageQueryIncludeStatement,
    });

    return chatMessage.type === CHAT_MESSAGE_KIND.TEXT
      ? TextChatMessage.fromEntity(chatMessage)
      : StickerChatMessage.fromEntity(chatMessage);
  }

  async getReferringChatMessageById(
    chatMessageId: string,
  ): Promise<ReferringChatMessage> {
    const chatMessage = await this.prisma.chatMessageEntity.findFirst({
      where: {
        id: chatMessageId,
      },
      include: referringChatMessageQueryIncludeStatement,
    });

    return ReferringChatMessage.fromEntity(chatMessage);
  }

  async save<T extends TextChatMessage | StickerChatMessage>(
    chatMessage: T,
  ): Promise<T> {
    const chatMessageInput: Prisma.ChatMessageEntityCreateInput = {
      chatroom: {
        connect: {
          id: chatMessage.chatroomId,
        },
      },
      type: chatMessage.type,
      user: {
        connect: {
          id: chatMessage.user.getUserId(),
        },
      },
    };

    if (chatMessage instanceof TextChatMessage) {
      chatMessageInput.content = chatMessage.content;
      chatMessageInput.attachment = {
        connect: {
          id: chatMessage.attachment.getId(),
        },
      };
    }

    if (chatMessage instanceof StickerChatMessage) {
      chatMessageInput.sticker = {
        connect: {
          id: chatMessage.sticker.getId(),
        },
      };
    }

    if (chatMessage.referringChatMessage) {
      chatMessageInput.referringChatMessage = {
        connect: {
          id: chatMessage.referringChatMessage.getId(),
        },
      };
    }

    // create or update
    let chatMessageEntity: TChatMessageQueryIncludeStatement;
    if (chatMessage.getChatMessageId()) {
      // update
      chatMessageEntity = await this.prisma.chatMessageEntity.update({
        where: {
          id: chatMessage.getChatMessageId(),
        },
        data: chatMessageInput,
        include: chatMessageQueryIncludeStatement,
      });
    } else {
      // create
      chatMessageEntity = await this.prisma.chatMessageEntity.create({
        data: chatMessageInput,
        include: chatMessageQueryIncludeStatement,
      });
    }

    return chatMessageEntity.type === CHAT_MESSAGE_KIND.STICKER
      ? (StickerChatMessage.fromEntity(chatMessageEntity) as T)
      : (TextChatMessage.fromEntity(chatMessageEntity) as T);
  }
}
