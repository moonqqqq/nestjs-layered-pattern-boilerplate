import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageRepository } from './chat-message.repository';
import { UserModule } from '../user/user.module';
import { ChatroomModule } from '../chatroom/chatroom.module';

@Module({
  imports: [UserModule, ChatroomModule],
  controllers: [ChatMessageController],
  providers: [ChatMessageService, ChatMessageRepository],
})
export class ChatMessageModule {}
