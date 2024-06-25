import { TErrorBody } from '../../common/error-bodies/types/error-content.type';

export abstract class BaseException extends Error {
  errorCode: string;

  constructor(errorBody: TErrorBody) {
    super(errorBody.message);
    this.errorCode = errorBody.errorCode;
  }
}
