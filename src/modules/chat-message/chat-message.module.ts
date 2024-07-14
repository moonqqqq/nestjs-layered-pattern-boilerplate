import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { TextChatMessageRepository } from './chat-message.repository';
import { UserModule } from '../user/user.module';
import { ChatroomModule } from '../chatroom/chatroom.module';

@Module({
  imports: [UserModule, ChatroomModule],
  controllers: [ChatMessageController],
  providers: [ChatMessageService, TextChatMessageRepository],
})
export class ChatMessageModule {}
