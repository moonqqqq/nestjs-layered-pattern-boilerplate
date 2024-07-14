import { Prisma } from '@prisma/client';
import { User } from '../../user/domains/user.domain';
import { TCHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { ChatMessage } from './chat-message.domain';
import { Sticker } from './sticker.domain';

export class StickerChatMessage extends ChatMessage {
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

  static fromEntity(
    chatMessage: Prisma.ChatMessageEntityGetPayload<{
      include: {
        chatroom: true;
        user: {
          include: {
            userProfile: true;
          };
        };
        sticker: {
          include: {
            file: true;
          };
        };
      };
    }>,
  ) {
    return new StickerChatMessage({
      id: chatMessage.id,
      chatroomId: chatMessage.chatroom.id,
      type: chatMessage.type,
      sticker: new Sticker(chatMessage.sticker),
      user: User.fromEntity(chatMessage.user),
    });
  }

  getSticker() {
    return this.sticker;
  }
}
