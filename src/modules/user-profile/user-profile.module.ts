import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { UserModule } from '../user/user.module';
import { UserProfileRepository } from './user-profile.repository';

@Module({
  imports: [UserModule],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileRepository],
})
export class UserProfileModule {}
