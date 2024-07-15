import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { UserModule } from '../user/user.module';
import { ChatroomModule } from '../chatroom/chatroom.module';
import { UploadModule } from '../upload/upload.module';
import { StickerModule } from '../sticker/sticker.module';
import { ChatMessageRepository } from './repositories/chat-message.repository';

@Module({
  imports: [UserModule, ChatroomModule, UploadModule, StickerModule],
  controllers: [ChatMessageController],
  providers: [ChatMessageService, ChatMessageRepository],
})
export class ChatMessageModule {}
