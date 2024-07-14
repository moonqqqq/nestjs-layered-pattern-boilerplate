import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  CHAT_MESSAGE_KIND,
  TCHAT_MESSAGE_KIND,
} from '../constants/chat-message.constant';
import { User } from '../../user/domains/user.domain';
import { StickerChatMessage } from '../domains/sticker-chat-message.domain';
import { Sticker } from '../domains/sticker.domain';
import { StickerResDto } from './sticker-res.dto';

export class StickerChatMessageResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _chatroomId: string;
  @Exclude() private readonly _type: TCHAT_MESSAGE_KIND;
  @Exclude() private readonly _sticker: Sticker;
  @Exclude() private readonly _sender: User;

  constructor(chatMessage: StickerChatMessage) {
    this._id = chatMessage.id;
    this._type = chatMessage.type;
    this._sticker = chatMessage.sticker;
    this._sender = chatMessage.user;
    this._chatroomId = chatMessage.chatroomId;
  }

  @ApiProperty({ example: '6a35589c-3e8c-4fd9-bda2-620d421dd5b9' })
  @Expose()
  get id(): string {
    return this._id;
  }

  @ApiProperty({ example: 'message content' })
  @Expose()
  get chatroomId(): string {
    return this._chatroomId;
  }

  @ApiProperty({ example: CHAT_MESSAGE_KIND.STICKER })
  @Expose()
  get type(): TCHAT_MESSAGE_KIND {
    return this._type;
  }

  @ApiProperty({ example: 'sticker message' })
  @Expose()
  get sticker(): StickerResDto {
    return new StickerResDto(this._sticker);
  }

  @ApiProperty({ example: '23djoigdf-23dfjd~' })
  @Expose()
  get senderId(): string {
    return this._sender.getUserId();
  }
}
