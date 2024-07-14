import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { ChatroomRepository } from './chatroom.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ChatroomController],
  providers: [ChatroomService, ChatroomRepository],
  exports: [ChatroomService],
})
export class ChatroomModule {}
