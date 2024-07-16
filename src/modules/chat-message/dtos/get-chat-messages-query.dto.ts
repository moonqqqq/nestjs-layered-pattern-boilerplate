import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class GetChatMessagesQueryDto {
  @ApiProperty({ example: '2392dfgn-23nkldf2~' })
  @IsString()
  chatroomId: string;

  @ApiPropertyOptional({ example: '2024-07-15T08:04:49.501Z' })
  @IsDateString()
  @IsOptional()
  lastItemCreatedAt: string;
}
