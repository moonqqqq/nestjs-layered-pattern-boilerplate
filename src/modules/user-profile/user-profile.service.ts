import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UpdateUserProfileDto } from './dtos/update-user-profile-body.dto';
import { WrongUserId } from '../../nestjs-utils/exceptions/service-layer.exception';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';
import { UserProfileRepository } from './user-profile.repository';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async getUserById(id: string) {
    return await this.userProfileRepository.findByUserId(id);
  }

  async updateUserProfile(id: string, payload: UpdateUserProfileDto) {
    const userProfile = await this.userProfileRepository.findByUserId(id);

    if (!userProfile) throw new WrongUserId(BadInputErrorBody.WRONG_USER_ID);

    userProfile.update(payload);

    return await this.userProfileRepository.save(userProfile);
  }
}
