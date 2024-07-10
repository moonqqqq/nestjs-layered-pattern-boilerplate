import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { WrongLoginCredential } from '../../nestjs-utils/exceptions/service-layer.exception';
import { AuthErrorBody } from '../../common/error-bodies/auth-error-body';
import { JwtService } from '../../share-modules/jwt/jwt.service';
import { ITokens } from '../../common/types/tokens.interface.';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

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
