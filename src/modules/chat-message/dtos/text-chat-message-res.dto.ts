import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  CHAT_MESSAGE_KIND,
  TCHAT_MESSAGE_KIND,
} from '../constants/chat-message.constant';
import { TextChatMessage } from '../domains/text-chat-message.domain';
import { User } from '../../user/domains/user.domain';
import { ReferringChatMessage } from '../domains/referring-chat-message.domain';
import { ReferringChatMessageResDto } from './referring-chat-message-res.dto';
import { InputFile } from '../../upload/domains/file.domain';
import { InputFileResDto } from '../../upload/dtos/input-file-res.dto';

export class TextChatMessageResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _chatroomId: string;
  @Exclude() private readonly _type: TCHAT_MESSAGE_KIND;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _sender: User;
  @Exclude() private readonly _taggedUserIds?: string[];
  @Exclude() private readonly _referringChatMessage?: ReferringChatMessage;
  @Exclude() private readonly _attachment?: InputFile;

  constructor(chatMessage: TextChatMessage) {
    this._id = chatMessage.id;
    this._type = chatMessage.type;
    this._content = chatMessage.content;
    this._sender = chatMessage.user;
    this._chatroomId = chatMessage.chatroomId;
    this._taggedUserIds = chatMessage.taggedUserIds;
    this._referringChatMessage = chatMessage.referringChatMessage;
    this._attachment = chatMessage.attachment;
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

  @ApiProperty({ example: CHAT_MESSAGE_KIND.TEXT })
  @Expose()
  get type(): TCHAT_MESSAGE_KIND {
    return this._type;
  }

  @ApiProperty({ example: 'message content' })
  @Expose()
  get content(): string {
    return this._content;
  }

  @ApiProperty({ example: '23djoigdf-23dfjd~' })
  @Expose()
  get senderId(): string {
    return this._sender.getUserId();
  }

  @ApiPropertyOptional()
  @Expose()
  get taggedUserIds(): string[] {
    return this._taggedUserIds;
  }

  @ApiPropertyOptional()
  @Expose()
  get referringChatMessage(): ReferringChatMessageResDto {
    if (this._referringChatMessage) {
      return new ReferringChatMessageResDto(this._referringChatMessage);
    }
  }

  @ApiPropertyOptional()
  @Expose()
  get attachment(): InputFileResDto {
    if (this._attachment) {
      return new InputFileResDto(this._attachment);
    }
  }
}
