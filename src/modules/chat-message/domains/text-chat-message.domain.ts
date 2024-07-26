import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { ChatMessage } from './chat-message.domain';
import { TChatMessageQueryIncludeStatement } from '../types/chat-message-entity-include.type';
import { ReferringChatMessage } from './referring-chat-message.domain';
import { InputFile } from '../../upload/domains/file.domain';
import { EmojiReaction } from '../../emoji-reaction/domains/emoji-reaction.domain';

export class TextChatMessage extends ChatMessage {
  readonly content: string;
  readonly taggedUserIds?: string[];
  readonly type: TCHAT_MESSAGE_KIND;

  constructor(chatMessage: {
    readonly id?: string;
    readonly chatroomId: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly content: string;
    readonly user: User;
    readonly taggedUserIds?: string[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly emojiReactions?: EmojiReaction[];
  }) {
    const { content, ...baseChatMessage } = chatMessage;
    super(baseChatMessage);
    this.content = content;
    this.taggedUserIds = chatMessage.taggedUserIds || [];
  }

  static fromEntity(chatMessage: TChatMessageQueryIncludeStatement) {
    const textChatMessage = new TextChatMessage({
      id: chatMessage.id,
      chatroomId: chatMessage.chatroom.id,
      type: chatMessage.type,
      content: chatMessage.content,
      user: User.fromEntity(chatMessage.user),
      taggedUserIds: chatMessage.taggedUserIds as string[],
      createdAt: chatMessage.createdAt,
    });

    if (chatMessage.referringChatMessage) {
      textChatMessage.setReferringChatMessage(
        ReferringChatMessage.fromEntity(chatMessage.referringChatMessage),
      );
    }

    if (chatMessage.attachment) {
      textChatMessage.setAttachment(
        InputFile.fromEntity(chatMessage.attachment),
      );
    }

    if (chatMessage?.emojiReactions?.length > 0) {
      textChatMessage.setEmojiReactions(
        chatMessage.emojiReactions.map((emojiReaction) =>
          EmojiReaction.fromEntity(emojiReaction),
        ),
      );
    }

    return textChatMessage;
  }

  getContent() {
    return this.content;
  }
}
