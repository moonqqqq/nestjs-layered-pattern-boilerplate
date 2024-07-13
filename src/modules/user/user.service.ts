import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { WrongUserId } from '../../nestjs-utils/exceptions/service-layer.exception';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsersByPhoneNumbers(phoneNumbers: string[]) {
    return await this.userRepository.findUsersByPhoneNumbers(phoneNumbers);
  }

  async findById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new WrongUserId(BadInputErrorBody.WRONG_USER_ID);
    return user;
  }
}
