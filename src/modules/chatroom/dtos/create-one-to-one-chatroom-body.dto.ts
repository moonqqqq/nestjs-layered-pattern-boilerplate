import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOneToOneChatroom {
  @ApiProperty({ example: 'sdjfioe-dfer232~' })
  @IsString()
  userId: string;
}
