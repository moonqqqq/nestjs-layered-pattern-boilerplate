import { User } from '../../user/domains/user.domain';

export class FriendRelation {
  id?: string;
  myId: string;
  friend: User;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(friendRelation: {
    id?: string;
    myId: string;
    friend: User;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    (this.id = friendRelation.id),
      (this.myId = friendRelation.myId),
      (this.friend = friendRelation.friend);
    this.createdAt = friendRelation.createdAt;
    this.updatedAt = friendRelation.updatedAt;
  }
}
