import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

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
      message: `Only ${allowedRules} can process`,
    });
  }
}
