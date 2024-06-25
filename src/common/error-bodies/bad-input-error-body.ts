import { IErrorContent } from './types/error-content.type';

export const BAD_INPUT_ERROR_CODE = {
  NO_FILE_PASSED: 'NO_FILE_PASSED',
  EXCEED_MAX_SIZE: 'EXCEED_MAX_SIZE',
} as const;

export const BadInputErrorBody: Record<
  keyof typeof BAD_INPUT_ERROR_CODE,
  IErrorContent
> = {
  NO_FILE_PASSED: {
    errorCode: BAD_INPUT_ERROR_CODE.NO_FILE_PASSED,
    message: 'There is no file',
  },
  EXCEED_MAX_SIZE: {
    errorCode: BAD_INPUT_ERROR_CODE.EXCEED_MAX_SIZE,
    message: 'Too large',
  },
} as const;
