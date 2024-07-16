import { Injectable } from '@nestjs/common';
import { CHAT_MESSAGE_KIND } from './constants/chat-message.constant';
import { User } from '../user/domains/user.domain';
import { TextChatMessage } from './domains/text-chat-message.domain';
import { StickerChatMessage } from './domains/sticker-chat-message.domain';
import { WrongInputId } from '../../nestjs-utils/exceptions/service-layer.exception';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';
import { StickerRepository } from '../sticker/sticker.repository';
import { ChatMessageRepository } from './repositories/chat-message.repository';
import { ReferringChatMessage } from './domains/referring-chat-message.domain';
import { InputFileRepository } from '../upload/input-file-repository';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly stickerRepository: StickerRepository,
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly inputFileRepository: InputFileRepository,
  ) {}

  async getChatMessages(
    currentUserId: string,
    chatroomId: string,
    lastItemCreatedAt: Date,
  ) {
    // get chatMessages
    return await this.chatMessageRepository.findManyByChatroomId(
      currentUserId,
      chatroomId,
      lastItemCreatedAt,
    );
  }

  async createTextChatMessage(
    sender: User,
    chatMessageData: {
      chatroomId: string;
      content: string;
      taggedUserIds?: string[];
      referringChatMessageId: string;
      attachmentId?: string;
    },
  ) {
    const textChatMessage = new TextChatMessage({
      chatroomId: chatMessageData.chatroomId,
      type: CHAT_MESSAGE_KIND.TEXT,
      content: chatMessageData.content,
      user: sender,
    });

    if (chatMessageData.referringChatMessageId) {
      const referringChatMessage: ReferringChatMessage =
        await this.chatMessageRepository.getReferringChatMessageById(
          chatMessageData.referringChatMessageId,
        );
      textChatMessage.setReferringChatMessage(referringChatMessage);
    }

    if (chatMessageData.attachmentId) {
      const attachment = await this.inputFileRepository.findById(
        chatMessageData.attachmentId,
      );
      textChatMessage.setAttachment(attachment);
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

    let referringChatMessage: ReferringChatMessage;
    if (chatMessageData.referringChatMessageId) {
      referringChatMessage =
        await this.chatMessageRepository.getReferringChatMessageById(
          chatMessageData.referringChatMessageId,
        );
      stickerChatMessage.setReferringChatMessage(referringChatMessage);
    }

    return await this.chatMessageRepository.save(stickerChatMessage);
  }
}
