import { Injectable } from '@nestjs/common';
import { FriendRelationRepository } from './friend-relation.repository';
import { User } from '../user/domains/user.domain';
import { FriendRelation } from './domains/friend-relation.domain';

@Injectable()
export class FriendRelationService {
  constructor(private readonly friendRepository: FriendRelationRepository) {}

  async addFriendBulk(myId: string, users: User[]) {
    const friendRelations: FriendRelation[] = users.map(
      (user) =>
        new FriendRelation({
          myId,
          friend: user,
        }),
    );

    return await Promise.all(
      friendRelations.map((friend) => this.friendRepository.save(friend)),
    );
  }

  async getFriends(userId: string) {
    return await this.friendRepository.getFriends(userId);
  }
}
