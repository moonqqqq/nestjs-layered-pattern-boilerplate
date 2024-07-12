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

  async save(friendRelation: FriendRelation): Promise<User> {
    const newFriendRelation = await this.prisma.friendRelationEntity.create({
      data: {
        userId: friendRelation.myId,
        friendId: friendRelation.friend.id,
      },
      include: this.friendRelationQueryIncludeStatement,
    });

    return User.fromEntity(newFriendRelation.friend);
  }
}
