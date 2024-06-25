import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IErrorContent } from '../../../common/error-bodies/types/error-content.type';

export const UnauthorizedRes = (...errors: IErrorContent[]) => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
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
