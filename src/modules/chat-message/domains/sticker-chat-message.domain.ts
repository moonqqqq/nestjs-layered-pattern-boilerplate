import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { ChatMessage } from './chat-message.domain';
import { Sticker } from '../../sticker/domains/sticker.domain';
import { TChatMessageQueryIncludeStatement } from '../types/chat-message-entity-include.type';
import { ReferringChatMessage } from './referring-chat-message.domain';
import { EmojiReaction } from '../../emoji-reaction/domains/emoji-reaction.domain';

export class StickerChatMessage extends ChatMessage {
  readonly sticker: Sticker;

  constructor(chatMessage: {
    readonly id?: string;
    readonly chatroomId: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly sticker: Sticker;
    readonly user: User;
    // readonly referringChatMessage?: ReferringChatMessage;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly emojiReactions?: EmojiReaction[];
  }) {
    const { sticker, ...baseChatMessage } = chatMessage;

    super(baseChatMessage);
    this.sticker = sticker;
  }

  static fromEntity(chatMessage: TChatMessageQueryIncludeStatement) {
    const stickerChatMessage = new StickerChatMessage({
      id: chatMessage.id,
      chatroomId: chatMessage.chatroom.id,
      type: chatMessage.type,
      sticker: Sticker.fromEntity(chatMessage.sticker),
      user: User.fromEntity(chatMessage.user),
      createdAt: chatMessage.createdAt,
    });

    if (chatMessage.referringChatMessage) {
      const referringChatMessage = ReferringChatMessage.fromEntity(
        chatMessage.referringChatMessage,
      );
      stickerChatMessage.setReferringChatMessage(referringChatMessage);
    }

    if (chatMessage?.emojiReactions?.length > 0) {
      stickerChatMessage.setEmojiReactions(
        chatMessage.emojiReactions.map((emojiReaction) =>
          EmojiReaction.fromEntity(emojiReaction),
        ),
      );
    }
    return stickerChatMessage;
  }

  getSticker() {
    return this.sticker;
  }
}
