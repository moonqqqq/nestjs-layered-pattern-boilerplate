import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsersByPhoneNumbers(phoneNumbers: string[]) {
    return await this.userRepository.findUsersByPhoneNumbers(phoneNumbers);
  }
}
