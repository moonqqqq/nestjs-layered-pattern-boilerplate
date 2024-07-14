import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';

export class ChatMessage {
  readonly id?: string;
  readonly chatroomId: string;
  readonly type: TCHAT_MESSAGE_KIND;
  readonly user: User;
  //   readonly emojiReactions?: EmojiReaction[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(chatMessage: {
    readonly id?: string;
    readonly chatroomId: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly user: User;
    //   readonly emojiReactions?: EmojiReaction[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    this.id = chatMessage.id;
    (this.chatroomId = chatMessage.chatroomId), (this.type = chatMessage.type);
    this.user = chatMessage.user;
    // this.emojiReactions = chatMessage.emojiReactions
    this.createdAt = chatMessage.createdAt;
    this.updatedAt = chatMessage.updatedAt;
  }

  getChatMessageId() {
    return this.id;
  }
}
