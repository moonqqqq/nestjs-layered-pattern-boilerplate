import { Module } from '@nestjs/common';
import { FriendRelationService } from './friend-relation.service';
import { FriendRelationController } from './friend-relation.controller';
import { FriendRelationRepository } from './friend-relation.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [FriendRelationController],
  providers: [FriendRelationService, FriendRelationRepository],
})
export class FriendsModule {}
