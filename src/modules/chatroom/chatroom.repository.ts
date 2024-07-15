import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { Chatroom } from './domains/chatroom.domain';
import { Prisma } from '@prisma/client';
import {
  TChatroomQueryIncludeStatement,
  chatroomQueryIncludeStatement,
} from './types/chatroom-include.type';

@Injectable()
export class ChatroomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(chatroomId: string) {
    const chatroomEntity = await this.prisma.chatroomEntity.findFirst({
      where: {
        id: chatroomId,
      },
      include: chatroomQueryIncludeStatement,
    });

    if (chatroomEntity) return Chatroom.fromEntity(chatroomEntity);

    return null;
  }

  async getChatroomsByUserId(userId: string) {
    const chatroomEntities = await this.prisma.chatroomEntity.findMany({
      where: {
        members: {
          some: {
            id: userId,
          },
        },
      },
      include: chatroomQueryIncludeStatement,
    });

    return chatroomEntities.map((chatroomEntity) =>
      Chatroom.fromEntity(chatroomEntity),
    );
  }

  async findByUserIds(userIds: string[]) {
    const chatrooms = await this.prisma.chatroomEntity.findMany({
      where: {
        AND: [
          {
            members: {
              every: {
                id: {
                  in: userIds,
                },
              },
            },
          },
        ],
      },
      include: chatroomQueryIncludeStatement,
    });
    if (chatrooms.length == 0) return null;

    const matchingChatroom = chatrooms.filter(
      (chatroom) => chatroom.members.length == userIds.length,
    );

    if (matchingChatroom.length == 0) return null;

    return Chatroom.fromEntity(matchingChatroom[0]);
  }

  async save(chatroom: Chatroom) {
    const memberConnect: Prisma.UserEntityCreateNestedManyWithoutChatroomsInput =
      {
        connect: chatroom.getMembers().map((member) => {
          return { id: member.id };
        }),
      };

    const chatroomData: Prisma.ChatroomEntityCreateInput = {
      type: chatroom.type,
      masterUserId: chatroom.getMasterUser().getUserId(),
      members: memberConnect,
    };

    // update or create
    let chatroomEntity: TChatroomQueryIncludeStatement;
    if (chatroom.getChatroomId()) {
      // update
      chatroomEntity = await this.prisma.chatroomEntity.update({
        where: {
          id: chatroom.getChatroomId(),
        },
        data: chatroomData,
        include: chatroomQueryIncludeStatement,
      });
    } else {
      // create
      chatroomEntity = await this.prisma.chatroomEntity.create({
        data: chatroomData,
        include: chatroomQueryIncludeStatement,
      });
    }

    return Chatroom.fromEntity(chatroomEntity);
  }
}
