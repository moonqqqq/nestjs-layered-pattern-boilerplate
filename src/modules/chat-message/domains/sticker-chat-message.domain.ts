import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { ChatMessage } from './chat-message.domain';
import { Sticker } from '../../sticker/domains/sticker.domain';
import { TChatMessageQueryIncludeStatement } from '../types/chat-message-entity-include.type';

export class StickerChatMessage extends ChatMessage {
  readonly sticker: Sticker;

  constructor(chatMessage: {
    readonly id?: string;
    readonly chatroomId: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly sticker: Sticker;
    readonly user: User;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    const { sticker, ...baseChatMessage } = chatMessage;

    super(baseChatMessage);
    this.sticker = sticker;
  }

  static fromEntity(chatMessage: TChatMessageQueryIncludeStatement) {
    return new StickerChatMessage({
      id: chatMessage.id,
      chatroomId: chatMessage.chatroom.id,
      type: chatMessage.type,
      sticker: Sticker.fromEntity(chatMessage.sticker),
      user: User.fromEntity(chatMessage.user),
    });
  }

  getSticker() {
    return this.sticker;
  }
}
