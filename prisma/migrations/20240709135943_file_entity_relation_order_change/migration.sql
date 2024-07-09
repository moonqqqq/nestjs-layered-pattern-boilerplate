/*
  Warnings:

  - You are about to drop the column `chatroomId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `stickerId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `userProfileId` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chatroomImageId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fileId]` on the table `Sticker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileImageId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_chatroomId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_stickerId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userProfileId_fkey";

-- DropIndex
DROP INDEX "File_chatroomId_key";

-- DropIndex
DROP INDEX "File_stickerId_key";

-- DropIndex
DROP INDEX "File_userProfileId_key";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "chatroomImageId" TEXT;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "chatroomId",
DROP COLUMN "stickerId",
DROP COLUMN "userProfileId";

-- AlterTable
ALTER TABLE "Sticker" ADD COLUMN     "fileId" TEXT;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "profileImageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Comment_chatroomImageId_key" ON "Comment"("chatroomImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Sticker_fileId_key" ON "Sticker"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_profileImageId_key" ON "UserProfile"("profileImageId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_chatroomImageId_fkey" FOREIGN KEY ("chatroomImageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
