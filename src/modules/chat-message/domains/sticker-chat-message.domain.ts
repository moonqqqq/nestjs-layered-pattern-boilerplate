import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { ChatMessage } from './chat-message.domain';
import { Sticker } from './sticker.domain';

export class TextChatMessage extends ChatMessage {
  readonly sticker: Sticker;

  constructor(chatMessage: {
    readonly id?: string;
    readonly chatroomId: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly sticker: Sticker;
    readonly user: User;
    //   readonly sticker?: Sticker;
    //   readonly emojiReactions?: EmojiReaction[];
    //   readonly taggedUsers?: User[];
    //   readonly referringMessage?: ChatMessage[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    const { sticker, ...baseChatMessage } = chatMessage;

    super(baseChatMessage);
    this.sticker = sticker;
  }

  getSticker() {
    return this.sticker;
  }
}
