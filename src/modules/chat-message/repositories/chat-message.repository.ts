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

@Injectable()
export class ChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

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
          id: chatMessage.user.id,
        },
      },
    };

    if (chatMessage instanceof TextChatMessage) {
      chatMessageInput.content = chatMessage.content;

      if (chatMessage?.taggedUsers?.length > 0) {
        chatMessageInput.taggedUsers = {
          createMany: {
            data: chatMessage.taggedUsers.map((taggedUser) => {
              return {
                userId: taggedUser.getUserId(),
              };
            }),
          },
        };
      }
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
