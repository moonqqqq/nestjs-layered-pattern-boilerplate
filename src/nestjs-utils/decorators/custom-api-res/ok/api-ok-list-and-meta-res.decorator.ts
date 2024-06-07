import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { DataResDTO } from '../../../../common/dtos/data-res.dto';
import { MetadataResDTO } from '../../../../common/dtos/metadata-res.dto';

export const ApiOKListAndMetadataResponse = <
  DataDTO extends Type<unknown>,
  MetadataDto extends Type<unknown>,
>(
  dataDTO: DataDTO,
  metadataDTO: MetadataDto,
) =>
  applyDecorators(
    ApiExtraModels(DataResDTO, dataDTO),
    ApiExtraModels(MetadataResDTO, metadataDTO),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(DataResDTO) },
          {
            properties: {
              metadata: { $ref: getSchemaPath(metadataDTO) },
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
