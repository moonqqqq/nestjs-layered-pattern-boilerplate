import { Module } from '@nestjs/common';
import { UserProfileService } from './services/user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
