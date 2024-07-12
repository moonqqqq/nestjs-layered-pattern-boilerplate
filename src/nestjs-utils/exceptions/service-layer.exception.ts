/**
 * all the exception below catched by ServiceLayerExceptionToHttpExceptionFilter
 */

import { BaseException } from './base.exception';

export abstract class ServiceLayerException extends BaseException {}

// Do not makes it have the same name with nest.js built-in exception name
export abstract class AuthenticationException extends ServiceLayerException {}
export abstract class AuthorizationException extends ServiceLayerException {}
export abstract class BadInputException extends ServiceLayerException {}
export abstract class DuplicateException extends ServiceLayerException {}

/**
 * Authentication
 */
export class NotMatchedOtp extends AuthenticationException {}
export class NotADoubleuBizNumber extends AuthenticationException {}
export class VerificationExpired extends AuthenticationException {}
export class OtpMaxTryExceed extends AuthenticationException {}
export class WrongLoginCredential extends AuthenticationException {}

/**
 * Authorization
 */
export class ThisIsForClient extends AuthorizationException {}
export class UnderReviewStatus extends AuthorizationException {}
export class NotMyEmployee extends AuthorizationException {}
export class NotMyProject extends AuthorizationException {}

/**
 * Bad Input
 */
export class NotExistingCompanyBizNumber extends BadInputException {}
export class WrongBusinessCertificateFileIdNumber extends BadInputException {}
export class WrongProjectId extends BadInputException {}
export class WrongUserId extends BadInputException {}
export class WrongFriendId extends BadInputException {}

/**
 * Conflict
 */
export class CompanyAlreadyExists extends DuplicateException {}
export class UserAlreadyExists extends DuplicateException {}
