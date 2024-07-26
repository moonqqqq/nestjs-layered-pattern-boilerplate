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
    emojiReactionInput: { chatMessageId: string; type: TEMOJI_REACTION },
  ) {
    let emojiReaction =
      await this.emojiReactionRepository.findByChatMessageIdAndUserId(
        emojiReactionInput.chatMessageId,
        userId,
      );

    // if user already set emoji on same chatmessage, update
    if (emojiReaction) {
      emojiReaction.changeType(emojiReactionInput.type);
    } else {
      emojiReaction = new EmojiReaction({
        userId,
        type: emojiReactionInput.type,
        chatMessageId: emojiReactionInput.chatMessageId,
      });
    }

    return await this.emojiReactionRepository.save(emojiReaction);
  }
}
