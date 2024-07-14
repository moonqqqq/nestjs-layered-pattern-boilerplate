import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../share-modules/database/prisma/prisma.service';
import { TextChatMessage } from '../domains/text-chat-message.domain';
import {
  TTextMessageQueryIncludeStatement,
  textMessageQueryIncludeStatement,
} from '../types/text-message-entity-include.type';

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

    // join taggedUsers
    if (textChatMessage?.taggedUsers?.length > 0) {
      textChatMessageInput.taggedUsers = {
        createMany: {
          data: textChatMessage.taggedUsers.map((taggedUser) => {
            return {
              userId: taggedUser.getUserId(),
            };
          }),
        },
      };
    }

    // create or update
    let textChatMessageEntity: TTextMessageQueryIncludeStatement;
    if (textChatMessage.getChatMessageId()) {
      // update
      textChatMessageEntity = await this.prisma.chatMessageEntity.update({
        where: {
          id: textChatMessage.getChatMessageId(),
        },
        data: textChatMessageInput,
        include: textMessageQueryIncludeStatement,
      });
    } else {
      // create
      textChatMessageEntity = await this.prisma.chatMessageEntity.create({
        data: textChatMessageInput,
        include: textMessageQueryIncludeStatement,
      });
    }

    return TextChatMessage.fromEntity(textChatMessageEntity);
  }
}
