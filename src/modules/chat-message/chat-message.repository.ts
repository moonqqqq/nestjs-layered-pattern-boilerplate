import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { ChatMessage } from './domains/chat-message.domain';
import { Prisma } from '@prisma/client';

const chatMessageQueryIncludeStatement = {
  chatroom: true,
  user: {
    include: {
      userProfile: true,
    },
  },
} as const;

@Injectable()
export class ChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(chatMessage: ChatMessage) {
    const chatMessageInput: Prisma.ChatMessageEntityCreateInput = {
      chatroom: {
        connect: {
          id: chatMessage.chatroomId,
        },
      },
      type: chatMessage.type,
      content: chatMessage.content,
      user: {
        connect: {
          id: chatMessage.user.id,
        },
      },
    };

    let chatMessageEntity: Prisma.ChatMessageEntityGetPayload<{
      include: typeof chatMessageQueryIncludeStatement;
    }>;

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

    return ChatMessage.fromEntity(chatMessageEntity);
  }
}
