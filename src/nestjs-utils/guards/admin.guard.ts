import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthErrorBody } from '../../common/error-bodies/auth-error-body';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * change by your program's user type
     */
    const allowedRules = ['admin'];
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      return false;
    }

    if (allowedRules.includes(req.user.type)) return true;
    throw new UnauthorizedException({
      errorCode: AuthErrorBody.NOT_ALLOWED_RULE.errorCode,
      message: `Only ${allowedRules} can process`,
    });
  }
}
