import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { ReferringChatMessage } from './referring-chat-message.domain';

export class ChatMessage {
  readonly id?: string;
  readonly chatroomId: string;
  readonly type: TCHAT_MESSAGE_KIND;
  readonly user: User;
  referringChatMessage?: ReferringChatMessage;
  //   readonly emojiReactions?: EmojiReaction[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(chatMessage: {
    readonly id?: string;
    readonly chatroomId: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly user: User;
    referringChatMessage?: ReferringChatMessage;
    //   readonly emojiReactions?: EmojiReaction[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    this.id = chatMessage.id;
    (this.chatroomId = chatMessage.chatroomId), (this.type = chatMessage.type);
    this.user = chatMessage.user;
    this.referringChatMessage = chatMessage.referringChatMessage;
    // this.emojiReactions = chatMessage.emojiReactions
    this.createdAt = chatMessage.createdAt;
    this.updatedAt = chatMessage.updatedAt;
  }

  getChatMessageId() {
    return this.id;
  }

  getType() {
    return this.type;
  }
}
