import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TextChatMessage } from './domains/text-chat-message.domain';

const textChatMessageQueryIncludeStatement = {
  chatroom: true,
  user: {
    include: {
      userProfile: true,
    },
  },
} as const;

@Injectable()
export class TextChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(textChatMessage: TextChatMessage) {
    const textChatMessageInput: Prisma.ChatMessageEntityCreateInput = {
      chatroom: {
        connect: {
          id: textChatMessage.chatroomId,
        },
      },
      type: textChatMessage.type,
      content: textChatMessage.content,
      user: {
        connect: {
          id: textChatMessage.user.id,
        },
      },
    };

    let textChatMessageEntity: Prisma.ChatMessageEntityGetPayload<{
      include: typeof textChatMessageQueryIncludeStatement;
    }>;

    if (textChatMessage.getChatMessageId()) {
      // update
      textChatMessageEntity = await this.prisma.chatMessageEntity.update({
        where: {
          id: textChatMessage.getChatMessageId(),
        },
        data: textChatMessageInput,
        include: textChatMessageQueryIncludeStatement,
      });
    } else {
      // create
      textChatMessageEntity = await this.prisma.chatMessageEntity.create({
        data: textChatMessageInput,
        include: textChatMessageQueryIncludeStatement,
      });
    }

    return TextChatMessage.fromEntity(textChatMessageEntity);
  }
}
