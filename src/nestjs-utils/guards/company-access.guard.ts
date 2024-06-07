// 만들다 만것

// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { UserType } from "@prisma/client";

// @Injectable()
// export class CompanyAccessGuard implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<boolean> {)
//     const req = context.switchToHttp().getRequest();
//     if (!req.headers.authorization) {
//       return false;
//     }

//     if (req.user.type === UserType.ADMIN || req.user.type === UserType.ASSISTANT_ADMIN) return true;

//     if (req.user.type)

//     throw new UnauthorizedException({
//       message: `Only ${allowedRules} can process`,
//     });
//   }
// }
