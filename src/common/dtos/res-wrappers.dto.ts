import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class ResWrapSingleDto<T> {
  @Exclude() private readonly _data: T;

  constructor(data: T) {
    this._data = data;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}

export class ResWrapSingleAndMetadataDto<T, P> {
  @Exclude() private readonly _data: T;
  @Exclude() private readonly _metadata: P;

  constructor(data: T, metadata: P) {
    this._data = data;
    this._metadata = metadata;
  }

  @ApiProperty()
  @Expose()
  get metadata(): P {
    return this._metadata;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}

export class ResWrapListDto<T> {
  @Exclude() private readonly _data: T[];

  constructor(data: T[]) {
    this._data = data;
  }

  @ApiProperty()
  @Expose()
  get data(): T[] {
    return this._data;
  }
}

export class ResWrapListAndMetadataDto<T, P> {
  @Exclude() private readonly _metadata: P;
  @Exclude() private readonly _data: T[];

  constructor(metadata: P, data: T[]) {
    this._metadata = metadata;
    this._data = data;
  }

  @ApiProperty()
  @Expose()
  get metadata(): P {
    return this._metadata;
  }

  @ApiProperty()
  @Expose()
  get data(): T[] {
    return this._data;
  }
}

// TODO: listAndPagination
