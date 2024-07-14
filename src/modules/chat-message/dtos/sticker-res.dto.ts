import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CHAT_MESSAGE_KIND } from '../constants/chat-message.constant';
import { Sticker } from '../domains/sticker.domain';
import { InputFileResDto } from '../../upload/dtos/upload-file-res.dto';
import { InputFile } from '../../upload/domains/file.domain';

export class StickerResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _file: InputFile;

  constructor(sticker: Sticker) {
    this._id = sticker.id;
    this._name = sticker.name;
    this._file = sticker.file;
  }

  @ApiProperty({ example: '6a35589c-3e8c-4fd9-bda2-620d421dd5b9' })
  @Expose()
  get id(): string {
    return this._id;
  }

  @ApiProperty({ example: 'message content' })
  @Expose()
  get name(): string {
    return this._name;
  }

  @ApiProperty({ example: CHAT_MESSAGE_KIND.STICKER })
  @Expose()
  get file(): InputFileResDto {
    return new InputFileResDto(this._file);
  }
}
