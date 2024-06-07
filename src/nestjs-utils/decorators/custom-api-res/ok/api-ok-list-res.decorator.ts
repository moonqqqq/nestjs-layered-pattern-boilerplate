import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { DataResDTO } from '../../../../common/dtos/data-res.dto';

export const ApiOKListResponse = <DataDTO extends Type<unknown>>(
  dataDTO: DataDTO,
) =>
  applyDecorators(
    ApiExtraModels(DataResDTO, dataDTO),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(DataResDTO) },
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
