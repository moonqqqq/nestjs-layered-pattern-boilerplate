import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../nestjs-utils/guards/jwt-auth.guard';
import { ApiOKListResponse } from '../../nestjs-utils/decorators/custom-api-res/ok/api-ok-list-res.decorator';
import { ReqUser } from '../../nestjs-utils/decorators/user.decorator';
import { IUserPayload } from '../../common/dtos/user-payload.dto';
import { TextCreateChatMessageBodyDto } from './dtos/text-create-chat-message-body.dto';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { ChatroomService } from '../chatroom/chatroom.service';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';
import { TextChatMessageResDto } from './dtos/text-chat-message-res.dto';
import { ResWrapSingleDto } from '../../common/dtos/res-wrappers.dto';

@ApiTags(`${API_ENDPOINT.CHAT_MESSAGE}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.CHAT_MESSAGE}`)
export class ChatMessageController {
  constructor(
    private readonly chatMessageService: ChatMessageService,
    private readonly chatroomservice: ChatroomService,
  ) {}

  @Post('text')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKListResponse(TextChatMessageResDto)
  @HttpCode(HttpStatus.OK)
  async createGroupChatroom(
    @ReqUser() currentUser: IUserPayload,
    @Body() { chatroomId, content }: TextCreateChatMessageBodyDto,
  ) {
    const chatroom = await this.chatroomservice.getChatroomById(chatroomId);

    if (!chatroom)
      throw new BadRequestException(BadInputErrorBody.WRONG_CHATROOM_ID);

    const sender = chatroom
      .getMembers()
      .find((member) => member.getUserId() == currentUser.id);
    const chatroomData = { chatroomId, content };

    const textChatMessage = await this.chatMessageService.createTextChatMessage(
      sender,
      chatroomData,
    );

    return new ResWrapSingleDto(new TextChatMessageResDto(textChatMessage));
  }
}
