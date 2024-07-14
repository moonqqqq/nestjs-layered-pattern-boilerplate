import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';

export class ChatMessage {
  readonly id?: string;
  readonly chatroomId: string;
  readonly type: TCHAT_MESSAGE_KIND;
  readonly user: User;
  //   readonly sticker?: Sticker;
  //   readonly emojiReactions?: EmojiReaction[];
  //   readonly taggedUsers?: User[];
  //   readonly referringMessage?: ChatMessage[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(chatMessage: {
    readonly id?: string;
    readonly chatroomId: string;
    readonly type: TCHAT_MESSAGE_KIND;
    readonly user: User;
    //   readonly sticker?: Sticker;
    //   readonly emojiReactions?: EmojiReaction[];
    //   readonly taggedUsers?: User[];
    //   readonly referringMessage?: ChatMessage[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    this.id = chatMessage.id;
    (this.chatroomId = chatMessage.chatroomId), (this.type = chatMessage.type);
    this.user = chatMessage.user;
    // this.sticker = chatMessage.
    // this.emojiReactions = chatMessage.emojiReactions
    // this.taggedUsers = chatMessage.taggedUsers
    // this.referringMessage = chatMessage.referringMessage
    this.createdAt = chatMessage.createdAt;
    this.updatedAt = chatMessage.updatedAt;
  }

  getChatMessageId() {
    return this.id;
  }
}
