import { Injectable } from '@nestjs/common';
import { CHAT_MESSAGE_KIND } from './constants/chat-message.constant';
import { User } from '../user/domains/user.domain';
import { TextChatMessage } from './domains/text-chat-message.domain';
import { StickerChatMessage } from './domains/sticker-chat-message.domain';

import { WrongInputId } from '../../nestjs-utils/exceptions/service-layer.exception';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';
import { StickerRepository } from '../sticker/sticker.repository';
import { UserRepository } from '../user/user.repository';
import { ChatMessageRepository } from './repositories/chat-message.repository';
import { ReferringChatMessage } from './domains/referring-chat-message.domain';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly stickerRepository: StickerRepository,
    private readonly userRepository: UserRepository,
    private readonly chatMessageRepository: ChatMessageRepository,
  ) {}

  async createTextChatMessage(
    sender: User,
    chatMessageData: {
      chatroomId: string;
      content: string;
      taggedUserIds?: string[];
      referringChatMessageId: string;
    },
  ) {
    let referringChatMessage: ReferringChatMessage;
    if (chatMessageData.referringChatMessageId) {
      referringChatMessage =
        await this.chatMessageRepository.getReferringChatMessageById(
          chatMessageData.referringChatMessageId,
        );
    }

    const textChatMessage = new TextChatMessage({
      chatroomId: chatMessageData.chatroomId,
      type: CHAT_MESSAGE_KIND.TEXT,
      content: chatMessageData.content,
      user: sender,
      referringChatMessage: referringChatMessage,
    });

    if (chatMessageData?.taggedUserIds?.length > 0) {
      const taggedUsers = await Promise.all(
        chatMessageData.taggedUserIds.map((taggedUserId) =>
          this.userRepository.findById(taggedUserId),
        ),
      );
      textChatMessage.addTaggedUsers(taggedUsers);
    }

    return await this.chatMessageRepository.save(textChatMessage);
  }

  async createStickerChatMessage(
    sender: User,
    chatMessageData: {
      chatroomId: string;
      stickerId: string;
      referringChatMessageId: string;
    },
  ) {
    let referringChatMessage: ReferringChatMessage;
    if (chatMessageData.referringChatMessageId) {
      referringChatMessage =
        await this.chatMessageRepository.getReferringChatMessageById(
          chatMessageData.referringChatMessageId,
        );
    }

    const sticker = await this.stickerRepository.findById(
      chatMessageData.stickerId,
    );

    if (!sticker) throw new WrongInputId(BadInputErrorBody.WRONG_STICKER_ID);

    const stickerChatMessage = new StickerChatMessage({
      chatroomId: chatMessageData.chatroomId,
      type: CHAT_MESSAGE_KIND.STICKER,
      sticker: sticker,
      user: sender,
      referringChatMessage,
    });

    return await this.chatMessageRepository.save(stickerChatMessage);
  }
}
