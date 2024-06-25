import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoggerService } from '../logger/interface/logger-service.interface';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { IUserPayload } from '../../common/dtos/user-payload.dto';
import { ITokens } from '../../common/types/tokens.interface.';
import { AuthErrorBody } from '../../common/error-bodies/auth-error-body';

@Injectable()
export class JwtService {
  constructor(
    private configService: ConfigService,
    private readonly loggerService: ILoggerService,
  ) {}

  async createJWT(userData: IUserPayload): Promise<ITokens> {
    const payload = userData;

    const [accessToken, refreshToken] = await Promise.all([
      this.#signToken(
        payload,
        this.configService.get('app.jwtSecret'),
        this.configService.get('app.jwtAccessExpire'),
      ),
      this.#signToken(
        payload,
        this.configService.get('app.jwtSecret'),
        this.configService.get('app.jwtRefreshExpire'),
      ),
    ]);

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  }

  async #signToken(
    payload: Partial<User>,
    secretKey: string,
    expiresIn: string | number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = {
        expiresIn: expiresIn,
      };

      jwt.sign(payload, secretKey, options, (err, token) => {
        if (err) {
          this.loggerService.error(err);
          reject(err);
        } else {
          resolve(token as string);
        }
      });
    });
  }

  async verifyToken(token: string): Promise<IUserPayload> {
    return new Promise((resolve, reject) => {
      if (token.split(' ')[0] !== 'Bearer') {
        throw new BadRequestException(AuthErrorBody.INVALID_TOKEN_TYPE);
      }

      jwt.verify(
        token.split(' ')[1],
        this.configService.get('app.jwtSecret'),
        (err, decoded) => {
          if (err) {
            if (err.message === 'jwt expired') {
              reject(new UnauthorizedException(AuthErrorBody.JWT_EXPIRED));
            } else if (err.message === 'invalid signature') {
              reject(
                new UnauthorizedException({ message: 'Invalid signature' }),
              );
            } else if (err.message === 'jwt malformed') {
              reject(new UnauthorizedException(AuthErrorBody.JWT_MALFORMED));
            } else {
              this.loggerService.error(err);
              reject(err);
            }
          } else {
            resolve(decoded as IUserPayload);
          }
        },
      );
    });
  }
}
