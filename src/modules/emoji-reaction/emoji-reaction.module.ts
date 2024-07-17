import { Module } from '@nestjs/common';
import { EmojiReactionService } from './emoji-reaction.service';
import { EmojiReactionController } from './emoji-reaction.controller';
import { EmojiReactionRepository } from './emoji-reaction.repository';

@Module({
  controllers: [EmojiReactionController],
  providers: [EmojiReactionService, EmojiReactionRepository],
})
export class EmojiReactionModule {}
