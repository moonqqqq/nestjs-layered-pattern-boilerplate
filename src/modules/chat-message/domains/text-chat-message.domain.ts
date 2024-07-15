import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { ChatMessage } from './chat-message.domain';
import { TChatMessageQueryIncludeStatement } from '../types/chat-message-entity-include.type';
import { ReferringChatMessage } from './referring-chat-message.domain';

export class TextChatMessage extends ChatMessage {
  readonly content: string;
  readonly taggedUsers?: User[];
  readonly type: TCHAT_MESSAGE_KIND;

  constructor(chatMessage: {
    readonly id?: string;
    readonly chatroomId: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly content: string;
    readonly user: User;
    readonly taggedUsers?: User[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    const { content, ...baseChatMessage } = chatMessage;
    super(baseChatMessage);
    this.content = content;
    this.taggedUsers = chatMessage.taggedUsers || [];
  }

  static fromEntity(chatMessage: TChatMessageQueryIncludeStatement) {
    const taggedUsers =
      chatMessage?.taggedUsers.length > 0
        ? chatMessage.taggedUsers.map((taggedUser) =>
            User.fromEntity(taggedUser.user),
          )
        : null;

    const textChatMessage = new TextChatMessage({
      id: chatMessage.id,
      chatroomId: chatMessage.chatroom.id,
      type: chatMessage.type,
      content: chatMessage.content,
      user: User.fromEntity(chatMessage.user),
      taggedUsers,
    });

    if (chatMessage.referringChatMessage) {
      const referringChatMessage = chatMessage.referringChatMessage
        ? ReferringChatMessage.fromEntity(chatMessage.referringChatMessage)
        : null;

      textChatMessage.setReferringChatMessage(referringChatMessage);
    }

    return textChatMessage;
  }

  getContent() {
    return this.content;
  }

  addTaggedUsers(users: User[]) {
    this.taggedUsers.push(...users);
  }

  getTaggedUsers() {
    return this.taggedUsers;
  }
}
