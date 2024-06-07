import { ApiProperty } from '@nestjs/swagger';

export class MetadataResDTO<T> {
  @ApiProperty()
  data: T;
}
