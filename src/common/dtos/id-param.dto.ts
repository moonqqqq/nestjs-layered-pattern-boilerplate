import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdParamDto {
  @ApiProperty({ example: '102' })
  @IsString()
  id: string;
}
