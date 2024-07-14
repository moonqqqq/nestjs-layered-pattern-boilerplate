import { Injectable } from '@nestjs/common';
import { TextChatMessageRepository } from './chat-message.repository';
import { CHAT_MESSAGE_KIND } from './constants/chat-message.constant';
import { User } from '../user/domains/user.domain';
import { TextChatMessage } from './domains/text-chat-message.domain';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly textChatMessageRepository: TextChatMessageRepository,
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
}
