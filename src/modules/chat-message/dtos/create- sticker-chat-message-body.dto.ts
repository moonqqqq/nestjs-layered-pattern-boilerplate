import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStickerChatMessageBodyDto {
  @ApiProperty({ example: '2392dfgn-23nkldf2~' })
  @IsString()
  chatroomId: string;

  @ApiProperty({
    example: 'dfjijnog-23nkljndjkfl~',
    description: 'Use upload api first to get fileId',
  })
  @IsString()
  stickerId: string;
}
