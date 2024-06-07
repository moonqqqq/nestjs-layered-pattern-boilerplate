import { ApiProperty } from '@nestjs/swagger';
import { IPagination } from '../interfaces/pagination.interface';
import { PaginationResDTO } from './pagination-res.dto';

export class PaginationAndDataResDTO<T> {
  @ApiProperty({
    type: PaginationResDTO,
  })
  pagination: IPagination;

  @ApiProperty()
  data: T;
}
