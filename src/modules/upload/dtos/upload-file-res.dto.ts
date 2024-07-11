import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { InputFile } from '../domains/file.domain';

export class InputFileResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _originalName: string;
  @Exclude() private readonly _path: string;
  @Exclude() private readonly _size: string;

  constructor(inputFile: InputFile) {
    this._id = inputFile.id;
    this._name = inputFile.name;
    this._originalName = inputFile.originalName;
    this._path = inputFile.path;
    this._size = inputFile.size;
  }

  @ApiProperty({ example: 'kim' })
  @Expose()
  get name(): string {
    return this._name;
  }

  @ApiProperty({ example: 'kim' })
  @Expose()
  get originalName(): string {
    return this._originalName;
  }

  @ApiProperty({ example: 'kim' })
  @Expose()
  get path(): string {
    return this._path;
  }

  @ApiProperty({ example: 'kim' })
  @Expose()
  get size(): string {
    return this._size;
  }
}
