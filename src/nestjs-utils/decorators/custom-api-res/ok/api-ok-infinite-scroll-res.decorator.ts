import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { InfiniteScrollAndDataResDTO } from '../../../../custom-utils/pagination/dtos/infinite-scroll-and-data-res.dto';

export const ApiOkInfiniteScrollResponse = <DataDTO extends Type<unknown>>(
  dataDTO: DataDTO,
) =>
  applyDecorators(
    ApiExtraModels(InfiniteScrollAndDataResDTO, dataDTO),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(InfiniteScrollAndDataResDTO) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDTO) },
              },
            },
          },
        ],
      },
    }),
  );
