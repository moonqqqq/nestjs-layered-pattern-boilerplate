import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { Chatroom } from './domains/chatroom.domain';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatroomRepository {
  constructor(private readonly prisma: PrismaService) {}

  private chatroomQueryIncludeStatement = {
    members: {
      include: {
        userProfile: true,
      },
    },
  };

  async getChatroomsByUserId(userId: string) {
    const chatroomEntities = await this.prisma.chatroomEntity.findMany({
      where: {
        members: {
          some: {
            id: userId,
          },
        },
      },
      include: this.chatroomQueryIncludeStatement,
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
      include: this.chatroomQueryIncludeStatement,
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

    let chatroomEntity: Prisma.ChatroomEntityGetPayload<{
      include: {
        members: {
          include: {
            userProfile: true;
          };
        };
      };
    }>;

    if (chatroom.getChatroomId()) {
      // update
      chatroomEntity = await this.prisma.chatroomEntity.update({
        where: {
          id: chatroom.getChatroomId(),
        },
        data: chatroomData,
        include: this.chatroomQueryIncludeStatement,
      });
    } else {
      // create
      chatroomEntity = await this.prisma.chatroomEntity.create({
        data: chatroomData,
        include: this.chatroomQueryIncludeStatement,
      });
    }

    return Chatroom.fromEntity(chatroomEntity);
  }
}
