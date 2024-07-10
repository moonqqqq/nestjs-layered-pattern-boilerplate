import { IErrorContent } from './types/error-content.type';

export const BAD_INPUT_ERROR_CODE = {
  NO_FILE_PASSED: 'NO_FILE_PASSED',
  EXCEED_MAX_SIZE: 'EXCEED_MAX_SIZE',
  DUPLICATE_LOGIN_ID: 'DUPLICATE_LOGIN_ID',
} as const;

export const BadInputErrorBody: Record<
  keyof typeof BAD_INPUT_ERROR_CODE,
  IErrorContent
> = {
  DUPLICATE_LOGIN_ID: {
    errorCode: BAD_INPUT_ERROR_CODE.DUPLICATE_LOGIN_ID,
    message: 'LoginId already exists',
  },
  NO_FILE_PASSED: {
    errorCode: BAD_INPUT_ERROR_CODE.NO_FILE_PASSED,
    message: 'There is no file',
  },
  EXCEED_MAX_SIZE: {
    errorCode: BAD_INPUT_ERROR_CODE.EXCEED_MAX_SIZE,
    message: 'Too large',
  },
} as const;
