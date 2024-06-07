import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationAndDataResDTO } from '../../../../custom-utils/pagination/dtos/pagination-and-data-res.dto';

export const ApiOkPaginatedResponse = <DataDTO extends Type<unknown>>(
  dataDTO: DataDTO,
) =>
  applyDecorators(
    ApiExtraModels(PaginationAndDataResDTO, dataDTO),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationAndDataResDTO) },
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
