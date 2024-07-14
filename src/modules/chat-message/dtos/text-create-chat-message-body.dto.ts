import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TextCreateChatMessageBodyDto {
  @ApiProperty({ example: '2392dfgn-23nkldf2~' })
  @IsString()
  chatroomId: string;

  @ApiProperty({ example: 'message content' })
  @IsString()
  content: string;
}
