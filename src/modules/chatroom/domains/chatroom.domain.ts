import { Prisma } from '@prisma/client';
import { InputFile } from '../../upload/domains/file.domain';
import { User } from '../../user/domains/user.domain';
import { TCHATROOM_KIND } from '../constants/chatroom.constant';

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

  static fromEntity(
    chatroom: Prisma.ChatroomEntityGetPayload<{
      include: {
        members: {
          include: {
            userProfile: true;
          };
        };
      };
    }>,
  ) {
    return new Chatroom({
      ...chatroom,
      members: chatroom.members.map((member) => User.fromEntity(member)),
    });
  }

  /**
   * How this is possible to create all of the type witout using prisma type..?s
   */
  // static fromEntity(chatroom: {
  //     id: string,
  //     type: TCHATROOM_KIND,
  //     title: string;
  //     masterUserId: string;
  //     chatroomImageId: string;
  //     createdAt: Date;
  //     updatedAt: Date;
  //     members: {
  //         id: string;
  //         loginId: string;
  //         password: string;
  //         userProfile: {
  //           id: string;
  //           name: string;
  //           phoneNumber: string;
  //           profileImage?: {
  //             id: string;
  //             name: string;
  //             originalName: string;
  //             path: string;
  //             size: string;
  //             createdAt: Date;
  //           };
  //         };
  //       }[];
  //     }
  // ) {
  //   const memebers = chatroom.members.map(member => User.fromEntity(member))
  // }

  getMasterUser() {
    return this.members.find((member) => member.id === this.masterUserId);
  }

  addMember(user: User) {
    this.members.push(user);
  }

  getMembers() {
    return this.members;
  }

  getChatroomId() {
    return this.id;
  }
}
