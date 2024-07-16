import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { DataResDTO } from '../../../../common/dtos/data-res.dto';
import { MetadataResDTO } from '../../../../common/dtos/metadata-res.dto';

export const ApiOKListAndMetadataResponse = <
  MetadataDto extends Type<unknown>,
  DataDTO extends Type<unknown>,
>(
  metadataDTO: MetadataDto,
  dataDTO: DataDTO,
) =>
  applyDecorators(
    ApiExtraModels(DataResDTO, dataDTO, MetadataResDTO, metadataDTO),
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          metadata: { $ref: getSchemaPath(metadataDTO) },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(dataDTO) },
          },
        },
      },
    }),
  );
