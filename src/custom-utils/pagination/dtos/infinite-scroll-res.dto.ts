import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class InfiniteScrollMetadataResDTO {
  @ApiProperty({ example: true })
  @IsBoolean()
  hasNext: boolean;
}
