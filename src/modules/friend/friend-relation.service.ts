import { Injectable } from '@nestjs/common';
import { FriendRelationRepository } from './friend-relation.repository';
import { User } from '../user/domains/user.domain';
import { FriendRelation } from './domains/friend-relation.domain';
import { WrongFriendId } from '../../nestjs-utils/exceptions/service-layer.exception';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';

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

  async getFriendDetail(currentUserId: string, friendId: string) {
    const friendDetail = await this.friendRepository.getFriendDetailByUserId(
      currentUserId,
      friendId,
    );

    if (!friendDetail)
      throw new WrongFriendId(BadInputErrorBody.WRONG_FRIEND_ID);

    return friendDetail;
  }
}
