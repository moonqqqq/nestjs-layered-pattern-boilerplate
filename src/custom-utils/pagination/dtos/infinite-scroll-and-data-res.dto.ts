import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { InfiniteScrollResDTO } from './infinite-scroll-res.dto';
import { Exclude, Expose } from 'class-transformer';

export class InfiniteScrollAndDataResDTO<T> {
  @ApiProperty({ type: InfiniteScrollResDTO })
  @IsBoolean()
  infiniteScroll: InfiniteScrollResDTO;

  @ApiProperty()
  data: T;
}

export class InfiniteScrollAndDataResDto<T> {
  @Exclude() private readonly _infiniteScroll: InfiniteScrollResDTO;
  @Exclude() private readonly _data: T;

  constructor(infiniteScrollData: InfiniteScrollResDTO, data: T) {
    this._infiniteScroll = infiniteScrollData;
    this._data = data;
  }

  @ApiProperty({ example: '6a35589c-3e8c-4fd9-bda2-620d421dd5b9' })
  @Expose()
  get infiniteScrollData(): InfiniteScrollResDTO {
    return this._infiniteScroll;
  }

  @ApiProperty({ example: 'message content' })
  @Expose()
  get data(): T {
    return this._data;
  }
}
