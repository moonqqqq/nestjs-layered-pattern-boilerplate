import { Injectable } from '@nestjs/common';
import { UserRepository } from '../modules/user/user.repository';

@Injectable()
export class UserProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string) {
    return await this.userRepository.findById(id);
  }
}
