import { Injectable } from '@nestjs/common';
import { CHAT_MESSAGE_KIND } from './constants/chat-message.constant';
import { User } from '../user/domains/user.domain';
import { TextChatMessage } from './domains/text-chat-message.domain';
import { StickerChatMessage } from './domains/sticker-chat-message.domain';

import { WrongInputId } from '../../nestjs-utils/exceptions/service-layer.exception';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';
import { StickerRepository } from '../sticker/sticker.repository';
import { TextChatMessageRepository } from './repositories/text-chat-message.repository';
import { StickerChatMessageRepository } from './repositories/sticker-chat-message.repository';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly textChatMessageRepository: TextChatMessageRepository,
    private readonly stickerChatMessageRepository: StickerChatMessageRepository,
    private readonly stickerRepository: StickerRepository,
  ) {}

  async createTextChatMessage(
    sender: User,
    chatMessageData: { chatroomId: string; content: string },
  ) {
    const textChatMessage = new TextChatMessage({
      chatroomId: chatMessageData.chatroomId,
      type: CHAT_MESSAGE_KIND.TEXT,
      content: chatMessageData.content,
      user: sender,
    });

    return await this.textChatMessageRepository.save(textChatMessage);
  }

  async createStickerChatMessage(
    sender: User,
    chatMessageData: { chatroomId: string; stickerId: string },
  ) {
    const sticker = await this.stickerRepository.findById(
      chatMessageData.stickerId,
    );

    if (!sticker) throw new WrongInputId(BadInputErrorBody.WRONG_STICKER_ID);

    const stickerChatMessage = new StickerChatMessage({
      chatroomId: chatMessageData.chatroomId,
      type: CHAT_MESSAGE_KIND.STICKER,
      sticker: sticker,
      user: sender,
    });

    return await this.stickerChatMessageRepository.save(stickerChatMessage);
  }
}
