import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class PaginationResDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  currentPage: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  lastPage: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasNext: boolean;

  @ApiProperty({ example: 1 })
  @IsNumber()
  totalCount: number;
}
