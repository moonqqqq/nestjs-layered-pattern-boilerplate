import { Injectable } from '@nestjs/common';
import { ChatMessageRepository } from './chat-message.repository';
import { ChatMessage } from './domains/chat-message.domain';
import { CHAT_MESSAGE_KIND } from './constants/chat-message.constant';
import { User } from '../user/domains/user.domain';

@Injectable()
export class ChatMessageService {
  constructor(private readonly chatMessageRepository: ChatMessageRepository) {}

  async createTextChatMessage(
    sender: User,
    chatMessageData: { chatroomId: string; content: string },
  ) {
    const textChatMessage = new ChatMessage({
      chatroomId: chatMessageData.chatroomId,
      type: CHAT_MESSAGE_KIND.TEXT,
      content: chatMessageData.content,
      user: sender,
    });

    return await this.chatMessageRepository.save(textChatMessage);
  }
}
