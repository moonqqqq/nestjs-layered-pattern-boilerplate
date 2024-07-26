import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import {
  EMOJI_REACTION,
  TEMOJI_REACTION,
} from '../constants/emoji-reaction.constant';

export class SetEmojiReactionBodyDto {
  @ApiProperty({ example: 'loginid123' })
  @IsString()
  chatMessageId: string;

  @ApiProperty({ example: EMOJI_REACTION.CRYING, enum: EMOJI_REACTION })
  @IsEnum(EMOJI_REACTION)
  emojiType: TEMOJI_REACTION;
}
