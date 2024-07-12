import { Controller } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';

@ApiTags(`${API_ENDPOINT.CHATROOM}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.CHATROOM}`)
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}
}
