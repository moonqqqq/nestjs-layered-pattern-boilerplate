import { ALL_ERROR_BODY } from '../all-error-body';

export interface IErrorContent {
  errorCode: keyof typeof ALL_ERROR_BODY;
  message: string;
}

export type TErrorBody = (typeof ALL_ERROR_BODY)[keyof typeof ALL_ERROR_BODY];
