import { Prisma } from '@prisma/client';
import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { ChatMessage } from './chat-message.domain';

export class TextChatMessage extends ChatMessage {
  readonly content: string;
  //   readonly taggedUsers?: User[];
  //   readonly referringMessage?: ChatMessage[];

  constructor(chatMessage: {
    readonly id?: string;
    readonly chatroomId: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly content: string;
    readonly user: User;
    //   readonly taggedUsers?: User[];
    //   readonly referringMessage?: ChatMessage[];

    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    const { content, ...baseChatMessage } = chatMessage;
    super(baseChatMessage);
    this.content = content;
    // this.taggedUsers = chatMessage.taggedUsers
    // this.referringMessage = chatMessage.referringMessage
  }

  static fromEntity(
    chatMessage: Prisma.ChatMessageEntityGetPayload<{
      include: {
        chatroom: true;
        user: {
          include: {
            userProfile: true;
          };
        };
      };
    }>,
  ) {
    return new TextChatMessage({
      id: chatMessage.id,
      chatroomId: chatMessage.chatroom.id,
      type: chatMessage.type,
      content: chatMessage.content,
      user: User.fromEntity(chatMessage.user),
    });
  }

  getContent() {
    return this.content;
  }
}