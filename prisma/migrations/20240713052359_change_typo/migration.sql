/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_chatroomImageId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatroomId_fkey";

-- DropForeignKey
ALTER TABLE "_ChatroomEntityToUserEntity" DROP CONSTRAINT "_ChatroomEntityToUserEntity_A_fkey";

-- DropTable
DROP TABLE "Comment";

-- CreateTable
CREATE TABLE "Chatroom" (
    "id" TEXT NOT NULL,
    "type" "ChatroomType" NOT NULL,
    "title" TEXT,
    "masterUserId" TEXT NOT NULL,
    "chatroomImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chatroom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chatroom_chatroomImageId_key" ON "Chatroom"("chatroomImageId");

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_chatroomImageId_fkey" FOREIGN KEY ("chatroomImageId") REFERENCES "InputFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatroomEntityToUserEntity" ADD CONSTRAINT "_ChatroomEntityToUserEntity_A_fkey" FOREIGN KEY ("A") REFERENCES "Chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
