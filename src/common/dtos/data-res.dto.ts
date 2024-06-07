import { ApiProperty } from '@nestjs/swagger';

export class DataResDTO<T> {
  @ApiProperty()
  data: T;
}
