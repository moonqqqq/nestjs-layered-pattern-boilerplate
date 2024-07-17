import { Controller } from '@nestjs/common';
import { EmojiReactionService } from './emoji-reaction.service';

@Controller('emoji-reaction')
export class EmojiReactionController {
  constructor(private readonly emojiReactionService: EmojiReactionService) {}
}
