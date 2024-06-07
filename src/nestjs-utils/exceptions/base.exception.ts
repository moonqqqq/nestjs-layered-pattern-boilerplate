import { TErrorBody } from '../../common/constants/error-body';

export abstract class BaseException extends Error {
  errorCode: string;

  constructor(errorBody: TErrorBody) {
    super(errorBody.message);
    this.errorCode = errorBody.errorCode;
  }
}
