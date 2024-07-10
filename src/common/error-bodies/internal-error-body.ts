import { IErrorContent } from './types/error-content.type';

export const INTERNAL_SERVER_CODE = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const InternalErrorBody: Record<
  keyof typeof INTERNAL_SERVER_CODE,
  IErrorContent
> = {
  INTERNAL_SERVER_ERROR: {
    errorCode: INTERNAL_SERVER_CODE.INTERNAL_SERVER_ERROR,
    message: 'Call the server developer',
  },
} as const;
