import { IErrorContent } from './types/error-content.type';

export const AUTH_ERROR_CODE = {
  TOKEN_REQUIRED: 'TOKEN_REQUIRED',
  NOT_MATCHED_OTP: 'NOT_MATCHED_OTP',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  VERIFICATION_EXPIRED: 'VERIFICATION_EXPIRED',
  OTP_MAX_TRY_EXCEED: 'OTP_MAX_TRY_EXCEED',
  JWT_EXPIRED: 'JWT_EXPIRED',
  JWT_MALFORMED: 'JWT_MALFORMED',
  INVALID_TOKEN_TYPE: 'INVALID_TOKEN_TYPE',
  NOT_ALLOWED_RULE: 'NOT_ALLOWED_RULE',
} as const;

export const AuthErrorBody: Record<
  keyof typeof AUTH_ERROR_CODE,
  IErrorContent
> = {
  TOKEN_REQUIRED: {
    errorCode: AUTH_ERROR_CODE.TOKEN_REQUIRED,
    message: 'Token required',
  },
  USER_ALREADY_EXISTS: {
    errorCode: AUTH_ERROR_CODE.USER_ALREADY_EXISTS,
    message: 'User already exists',
  },
  NOT_MATCHED_OTP: {
    errorCode: AUTH_ERROR_CODE.NOT_MATCHED_OTP,
    message: 'OTP not matched',
  },
  VERIFICATION_EXPIRED: {
    errorCode: AUTH_ERROR_CODE.VERIFICATION_EXPIRED,
    message: 'Verification expired, please try agin from the first',
  },
  OTP_MAX_TRY_EXCEED: {
    errorCode: AUTH_ERROR_CODE.OTP_MAX_TRY_EXCEED,
    message: 'Please try again after 10 minutes',
  },
  JWT_EXPIRED: {
    errorCode: AUTH_ERROR_CODE.JWT_EXPIRED,
    message: 'JWT expired',
  },
  JWT_MALFORMED: {
    errorCode: AUTH_ERROR_CODE.JWT_MALFORMED,
    message: 'JWT marformed',
  },
  INVALID_TOKEN_TYPE: {
    errorCode: AUTH_ERROR_CODE.INVALID_TOKEN_TYPE,
    message: 'Only Bearer supported',
  },
  NOT_ALLOWED_RULE: {
    errorCode: AUTH_ERROR_CODE.NOT_ALLOWED_RULE,
    message: 'You dont have permission',
  },
} as const;
