import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { TextChatMessageRepository } from './chat-message.repository';
import { UserModule } from '../user/user.module';
import { ChatroomModule } from '../chatroom/chatroom.module';
import { UploadModule } from '../upload/upload.module';
import { StickerChatMessageRepository } from './sticker-chat-message.repository';
import { StickerModule } from '../sticker/sticker.module';

@Module({
  imports: [UserModule, ChatroomModule, UploadModule, StickerModule],
  controllers: [ChatMessageController],
  providers: [
    ChatMessageService,
    TextChatMessageRepository,
    StickerChatMessageRepository,
  ],
})
export class ChatMessageModule {}
