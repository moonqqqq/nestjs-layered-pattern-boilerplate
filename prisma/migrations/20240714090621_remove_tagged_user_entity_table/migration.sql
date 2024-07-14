/*
  Warnings:

  - You are about to drop the `TaggedUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaggedUser" DROP CONSTRAINT "TaggedUser_messageId_fkey";

-- DropForeignKey
ALTER TABLE "TaggedUser" DROP CONSTRAINT "TaggedUser_userId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "content" DROP NOT NULL;

-- DropTable
DROP TABLE "TaggedUser";
