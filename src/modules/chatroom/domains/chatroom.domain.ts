import { InputFile } from '../../upload/domains/file.domain';
import { User } from '../../user/domains/user.domain';
import { TCHATROOM_KIND } from '../constants/chatroom.constant';
import { TChatroomQueryIncludeStatement } from '../types/chatroom-include.type';

export class Chatroom {
  readonly id?: string;
  readonly type: TCHATROOM_KIND;
  readonly title?: string;
  readonly members: User[];
  readonly masterUserId: string;
  readonly chatroomImage?: InputFile;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(chatroom: {
    id?: string;
    type: TCHATROOM_KIND;
    title?: string;
    members?: User[];
    masterUserId: string;
    chatroomImage?: InputFile;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    (this.id = chatroom.id),
      (this.type = chatroom.type),
      (this.title = chatroom.title),
      (this.members = chatroom.members || []),
      (this.masterUserId = chatroom.masterUserId);
    this.chatroomImage = chatroom.chatroomImage;
    this.createdAt = chatroom.createdAt;
    this.updatedAt = chatroom.updatedAt;
  }

  static fromEntity(chatroom: TChatroomQueryIncludeStatement) {
    return new Chatroom({
      ...chatroom,
      members: chatroom.members.map((member) => User.fromEntity(member)),
    });
  }

  getMasterUser() {
    return this.members.find((member) => member.id === this.masterUserId);
  }

  addMember(user: User) {
    this.members.push(user);
  }

  addMembers(users: User[]) {
    this.members.push(...users);
  }

  isMember(userId: string) {
    return this.members.some((member) => member.id === userId);
  }

  getMembers() {
    return this.members;
  }

  getChatroomId() {
    return this.id;
  }
}
