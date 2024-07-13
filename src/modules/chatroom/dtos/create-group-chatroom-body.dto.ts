import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateGroupChatroom {
  @ApiProperty({
    example: ['d239dfg-232fdgsd~', '4959dfdfg-23ndjkgnkl2~'],
    description: 'An array of userIds',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  userIds: string[];
}
