import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import {
  UserAlreadyExists,
  WrongLoginCredential,
} from '../../nestjs-utils/exceptions/service-layer.exception';
import { AuthErrorBody } from '../../common/error-bodies/auth-error-body';
import { JwtService } from '../../share-modules/jwt/jwt.service';
import { ITokens } from '../../common/types/tokens.interface.';
import { User } from '../user/domains/user.domain';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: User): Promise<void> {
    const alreadyExists = await this.userRepository.findByLoginId(
      user.getUserLoginId(),
    );
    if (alreadyExists)
      throw new UserAlreadyExists(BadInputErrorBody.DUPLICATE_LOGIN_ID);

    // Create user
    await this.userRepository.create(user);
  }

  async signin(loginId: string, password: string): Promise<ITokens> {
    // get User data
    const user = await this.userRepository.findByLoginId(loginId);

    if (!user || !user.checkPasswordCorrect(password))
      throw new WrongLoginCredential(AuthErrorBody.WRONG_LOGIN_CREDENTIAL);

    const userPayload = { id: user.getUserId() };

    // create Token
    return await this.jwtService.createJWT(userPayload);
  }
}
