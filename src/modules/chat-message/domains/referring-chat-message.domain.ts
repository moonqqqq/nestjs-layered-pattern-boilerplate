import { Sticker } from '../../sticker/domains/sticker.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { TReferringChatMessageQueryIncludeStatement } from '../types/referring-chat-message-entity-include.type';

export class ReferringChatMessage {
  readonly id?: string;
  readonly type: TCHAT_MESSAGE_KIND;
  readonly userId: string;
  readonly content?: string;
  readonly sticker?: Sticker;

  constructor(chatMessage: {
    readonly id?: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly userId: string;
    readonly content?: string;
    readonly sticker?: Sticker;
  }) {
    this.id = chatMessage.id;
    (this.type = chatMessage.type), (this.userId = chatMessage.userId);
    this.content = chatMessage.content;
    this.sticker = chatMessage.sticker;
  }

  getId() {
    return this.id;
  }

  static fromEntity(
    chatMessageEntity: TReferringChatMessageQueryIncludeStatement,
  ) {
    return new ReferringChatMessage({
      id: chatMessageEntity.id,
      type: chatMessageEntity.type,
      userId: chatMessageEntity.userId,
      content: chatMessageEntity.content,
      sticker: chatMessageEntity.sticker
        ? Sticker.fromEntity(chatMessageEntity.sticker)
        : null,
    });
  }
}
