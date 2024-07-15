import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class TextCreateChatMessageBodyDto {
  @ApiProperty({ example: '2392dfgn-23nkldf2~' })
  @IsString()
  chatroomId: string;

  @ApiProperty({ example: 'message content' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: ['d28ngkldf-23nkldmklf~'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  taggedUserIds: string[];

  @ApiPropertyOptional({ example: 'd28ngkldf-23nkldmklf~' })
  @IsString()
  @IsOptional()
  referringChatMessageId: string;

  @ApiPropertyOptional({ example: 'd28ngkldf-23nkldmklf~' })
  @IsString()
  @IsOptional()
  attachmentId: string;
}
