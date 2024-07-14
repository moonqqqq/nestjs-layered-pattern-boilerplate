import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { TextChatMessageRepository } from './chat-message.repository';
import { UserModule } from '../user/user.module';
import { ChatroomModule } from '../chatroom/chatroom.module';
import { UploadModule } from '../upload/upload.module';
import { StickerRepository } from './sticker.repository';
import { StickerChatMessageRepository } from './sticker-chat-message.repository';

@Module({
  imports: [UserModule, ChatroomModule, UploadModule],
  controllers: [ChatMessageController],
  providers: [
    ChatMessageService,
    TextChatMessageRepository,
    StickerChatMessageRepository,
    StickerRepository,
  ],
})
export class ChatMessageModule {}
