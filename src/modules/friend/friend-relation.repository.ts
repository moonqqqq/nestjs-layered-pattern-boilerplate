import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { FriendRelation } from './domains/friend-relation.domain';
import { User } from '../user/domains/user.domain';

@Injectable()
export class FriendRelationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private friendRelationQueryIncludeStatement = {
    friend: {
      include: {
        userProfile: {
          include: {
            profileImage: true,
          },
        },
      },
    },
  };

  async getFriends(userId: string) {
    const friendRelationEntities =
      await this.prisma.friendRelationEntity.findMany({
        where: {
          userId,
        },
        include: this.friendRelationQueryIncludeStatement,
        orderBy: {
          friend: {
            userProfile: {
              name: 'asc',
            },
          },
        },
      });

    const friends = friendRelationEntities.map((friendRelation) =>
      User.fromEntity(friendRelation.friend),
    );

    return friends;
  }

  async getFriendDetailByUserId(currentUserId: string, friendId: string) {
    const friendRelationEntity =
      await this.prisma.friendRelationEntity.findFirst({
        where: {
          userId: currentUserId,
          friendId,
        },
        include: this.friendRelationQueryIncludeStatement,
      });

    if (!friendRelationEntity) return null;

    return User.fromEntity(friendRelationEntity.friend);
  }

  async save(friendRelation: FriendRelation): Promise<User> {
    const newFriendRelationEntity =
      await this.prisma.friendRelationEntity.create({
        data: {
          user: {
            connect: {
              id: friendRelation.myId,
            },
          },
          friend: {
            connect: {
              id: friendRelation.friend.id,
            },
          },
        },
        include: this.friendRelationQueryIncludeStatement,
      });

    return User.fromEntity(newFriendRelationEntity.friend);
  }
}
