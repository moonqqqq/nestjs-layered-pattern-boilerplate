import { EmojiReacitonType } from '@prisma/client';
import { TEMOJI_REACTION } from '../constants/emoji-reaction.constant';
import { TEmojiReactionQueryIncludeStatement } from '../types/emoji-reaction-entity-include.type';

export class EmojiReaction {
  readonly id?: string;
  readonly userId?: string;
  type: TEMOJI_REACTION;
  readonly chatMessageId: string;
  readonly createdAt?: Date;

  constructor(emojiReaction: {
    readonly id?: string;
    readonly userId: string;
    type: TEMOJI_REACTION;
    readonly chatMessageId: string;
    readonly createdAt?: Date;
  }) {
    this.id = emojiReaction.id;
    this.userId = emojiReaction.userId;
    this.type = emojiReaction.type;
    this.createdAt = emojiReaction.createdAt;
    this.chatMessageId = emojiReaction.chatMessageId;
  }

  static fromEntity(emojiReactionEntity: TEmojiReactionQueryIncludeStatement) {
    return new EmojiReaction({ ...emojiReactionEntity });
  }

  getId() {
    return this.id;
  }

  getChatMessageId() {
    return this.chatMessageId;
  }

  changeType(type: EmojiReacitonType) {
    return (this.type = type);
  }

  static toCounts(
    emojiReactions: EmojiReaction[],
  ): Record<TEMOJI_REACTION, number> {
    return emojiReactions.reduce((acc, cur) => {
      if (acc[cur.type]) {
        acc[cur.type] += 1;
      } else {
        acc[cur.type] = 1;
      }
      return acc;
    }, {}) as Record<TEMOJI_REACTION, number>;
  }
}
