/*
  Warnings:

  - You are about to drop the column `chatroomMasterUserId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `masterUserId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "chatroomMasterUserId",
ADD COLUMN     "masterUserId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
