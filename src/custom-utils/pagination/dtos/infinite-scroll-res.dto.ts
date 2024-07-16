import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class InfiniteScrollResDTO {
  @ApiProperty({ example: true })
  @IsBoolean()
  hasNext: boolean;
}
