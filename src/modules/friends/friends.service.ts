import { Injectable } from '@nestjs/common';
import { FriendRepository } from './friends.repository';

@Injectable()
export class FriendsService {
  constructor(private readonly friendRepository: FriendRepository) {}
}
