import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { ChatroomRepository } from './chatroom.repository';

@Module({
  controllers: [ChatroomController],
  providers: [ChatroomService, ChatroomRepository],
})
export class ChatroomModule {}
