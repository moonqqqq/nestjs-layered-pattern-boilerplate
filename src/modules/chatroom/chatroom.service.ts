import { Injectable } from '@nestjs/common';
import { ChatroomRepository } from './chatroom.repository';
import { UserRepository } from '../user/user.repository';
import { WrongUserId } from '../../nestjs-utils/exceptions/service-layer.exception';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';
import { Chatroom } from './domains/chatroom.domain';
import { CHATROOM_KIND } from './constants/chatroom.constant';

@Injectable()
export class ChatroomService {
  constructor(
    private readonly chatroomRepository: ChatroomRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createOneToOneChatroom(currnetUserId: string, targetUserId: string) {
    const [masterUser, targetUser] = await Promise.all([
      this.userRepository.findById(currnetUserId),
      this.userRepository.findById(targetUserId),
    ]);

    if (!targetUser) throw new WrongUserId(BadInputErrorBody.WRONG_USER_ID);

    const newChatroom = new Chatroom({
      type: CHATROOM_KIND.ONE_TO_ONE,
      masterUserId: masterUser.id,
    });

    newChatroom.addMember(masterUser);
    newChatroom.addMember(targetUser);

    return await this.chatroomRepository.save(newChatroom);
  }
}
