import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  CHAT_MESSAGE_KIND,
  TCHAT_MESSAGE_KIND,
} from '../constants/chat-message.constant';
import { Sticker } from '../../sticker/domains/sticker.domain';
import { StickerResDto } from '../../sticker/dtos/sticker-res.dto';
import { ReferringChatMessage } from '../domains/referring-chat-message.domain';

export class ReferringChatMessageResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _type: TCHAT_MESSAGE_KIND;
  @Exclude() private readonly _senderId: string;
  @Exclude() private readonly _content?: string;
  @Exclude() private readonly _sticker?: Sticker;

  constructor(chatMessage: ReferringChatMessage) {
    this._id = chatMessage.id;
    this._type = chatMessage.type;
    this._senderId = chatMessage.userId;
    this._content = chatMessage.content;
    this._sticker = chatMessage.sticker;
  }

  @ApiProperty({ example: '6a35589c-3e8c-4fd9-bda2-620d421dd5b9' })
  @Expose()
  get id(): string {
    return this._id;
  }

  @ApiProperty({ example: '23djoigdf-23dfjd~' })
  @Expose()
  get senderId(): string {
    return this._senderId;
  }

  @ApiProperty({ example: CHAT_MESSAGE_KIND.STICKER })
  @Expose()
  get type(): TCHAT_MESSAGE_KIND {
    return this._type;
  }

  @ApiProperty({ example: '6a35589c-3e8c-4fd9-bda2-620d421dd5b9' })
  @Expose()
  get content(): string {
    return this._content;
  }

  @ApiProperty()
  @Expose()
  get sticker(): StickerResDto {
    if (this._sticker) return new StickerResDto(this._sticker);
  }
}
