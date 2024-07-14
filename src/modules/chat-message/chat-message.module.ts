import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { UserModule } from '../user/user.module';
import { ChatroomModule } from '../chatroom/chatroom.module';
import { UploadModule } from '../upload/upload.module';
import { StickerModule } from '../sticker/sticker.module';
import { TextChatMessageRepository } from './repositories/text-chat-message.repository';
import { StickerChatMessageRepository } from './repositories/sticker-chat-message.repository';

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
