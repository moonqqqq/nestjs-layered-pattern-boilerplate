import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IErrorContent } from '../../../common/constants/error-body';

export const ConflictRes = (...errors: IErrorContent[]) => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.CONFLICT,
      content: {
        'application/json': {
          examples: errors.reduce((list, error) => {
            list[error.errorCode] = { value: error };
            return list;
          }, {}),
        },
      },
    }),
  );
};
