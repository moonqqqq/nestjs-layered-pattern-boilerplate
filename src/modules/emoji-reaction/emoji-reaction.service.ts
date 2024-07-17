import { Injectable } from '@nestjs/common';
import { EmojiReactionRepository } from './emoji-reaction.repository';
import { TEMOJI_REACTION } from './constants/emoji-reaction.constant';
import { EmojiReaction } from './domains/emoji-reaction.domain';

@Injectable()
export class EmojiReactionService {
  constructor(
    private readonly emojiReactionRepository: EmojiReactionRepository,
  ) {}

  async setEmojiReaction(
    userId: string,
    emojiReactionInput: { chatmessageId: string; type: TEMOJI_REACTION },
  ) {
    const emojiReaction = new EmojiReaction({
      userId,
      type: emojiReactionInput.type,
      chatMessageId: emojiReactionInput.chatmessageId,
    });

    return await this.emojiReactionRepository.save(emojiReaction);
  }
}
