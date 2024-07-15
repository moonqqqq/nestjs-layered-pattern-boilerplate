import { Injectable } from '@nestjs/common';
import { ChatroomRepository } from './chatroom.repository';
import { UserRepository } from '../user/user.repository';
import { Chatroom } from './domains/chatroom.domain';
import { CHATROOM_KIND } from './constants/chatroom.constant';
import { User } from '../user/domains/user.domain';

@Injectable()
export class ChatroomService {
  constructor(
    private readonly chatroomRepository: ChatroomRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getChatroomById(chatroomId: string) {
    return await this.chatroomRepository.findById(chatroomId);
  }

  async checkChatroomExists(userIds: string[]) {
    return await this.chatroomRepository.findByUserIds(userIds);
  }

  async getMyChatrooms(userId: string) {
    return await this.chatroomRepository.getChatroomsByUserId(userId);
  }

  async createOneToOneChatroom(currnetUserId: string, members: User[]) {
    const newChatroom = new Chatroom({
      type: CHATROOM_KIND.ONE_TO_ONE,
      masterUserId: currnetUserId,
      members,
    });

    return await this.chatroomRepository.save(newChatroom);
  }

  async createGroupChatroom(currentUserId: string, members: User[]) {
    const newGroupChatroom = new Chatroom({
      type: CHATROOM_KIND.GROUP,
      masterUserId: currentUserId,
      members,
    });

    return await this.chatroomRepository.save(newGroupChatroom);
  }
}
