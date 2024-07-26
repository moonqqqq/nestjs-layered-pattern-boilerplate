/*
  Warnings:

  - You are about to drop the column `emogiReactionType` on the `EmojiReaction` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `EmojiReaction` table. All the data in the column will be lost.
  - Added the required column `chatMessageId` to the `EmojiReaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `EmojiReaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmojiReaction" DROP CONSTRAINT "EmojiReaction_messageId_fkey";

-- AlterTable
ALTER TABLE "EmojiReaction" DROP COLUMN "emogiReactionType",
DROP COLUMN "messageId",
ADD COLUMN     "chatMessageId" TEXT NOT NULL,
ADD COLUMN     "type" "EmojiReacitonType" NOT NULL;

-- AddForeignKey
ALTER TABLE "EmojiReaction" ADD CONSTRAINT "EmojiReaction_chatMessageId_fkey" FOREIGN KEY ("chatMessageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
