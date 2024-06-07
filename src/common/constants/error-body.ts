export const ErrorCode = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_MATCHED_OTP: 'NOT_MATCHED_OTP',
  WRONG_LOGIN_CREDENTIAL: 'WRONG_LOGIN_CREDENTIAL',
  VERIFICATION_EXPIRED: 'VERIFICATION_EXPIRED',
  OTP_MAX_TRY_EXCEED: 'OTP_MAX_TRY_EXCEED',
  JWT_EXPIRED: 'JWT_EXPIRED',
  JWT_MALFORMED: 'JWT_MALFORMED',
} as const;

export interface IErrorContent {
  errorCode: keyof typeof ErrorCode;
  message: string;
}

export type TErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export const ErrorBody: Record<keyof typeof ErrorCode, IErrorContent> = {
  USER_ALREADY_EXISTS: {
    errorCode: ErrorCode.USER_ALREADY_EXISTS,
    message: 'User already exists',
  },
  INTERNAL_SERVER_ERROR: {
    errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  NOT_MATCHED_OTP: {
    errorCode: ErrorCode.NOT_MATCHED_OTP,
    message: 'OTP not matched',
  },
  WRONG_LOGIN_CREDENTIAL: {
    errorCode: ErrorCode.WRONG_LOGIN_CREDENTIAL,
    message: 'ID or Password is wrong',
  },
  VERIFICATION_EXPIRED: {
    errorCode: ErrorCode.VERIFICATION_EXPIRED,
    message: 'Verification expired, please try agin from the first',
  },
  OTP_MAX_TRY_EXCEED: {
    errorCode: ErrorCode.OTP_MAX_TRY_EXCEED,
    message: 'Please try again after 10 minutes',
  },
  JWT_EXPIRED: {
    errorCode: ErrorCode.JWT_EXPIRED,
    message: 'JWT expired',
  },
  JWT_MALFORMED: {
    errorCode: ErrorCode.JWT_MALFORMED,
    message: 'JWT marformed',
  },
};

export type TErrorBody = (typeof ErrorBody)[keyof typeof ErrorBody];
