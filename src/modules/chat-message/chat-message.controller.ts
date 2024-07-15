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
import { TextCreateChatMessageBodyDto } from './dtos/create-text-chat-message-body.dto';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { ChatroomService } from '../chatroom/chatroom.service';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';
import { TextChatMessageResDto } from './dtos/text-chat-message-res.dto';
import { ResWrapSingleDto } from '../../common/dtos/res-wrappers.dto';
import { CreateStickerChatMessageBodyDto } from './dtos/create- sticker-chat-message-body.dto';
import { StickerChatMessageResDto } from './dtos/sticker-chat-message-res.dto';
import { UserService } from '../user/user.service';

@ApiTags(`${API_ENDPOINT.CHAT_MESSAGE}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.CHAT_MESSAGE}`)
export class ChatMessageController {
  constructor(
    private readonly chatMessageService: ChatMessageService,
    private readonly chatroomservice: ChatroomService,
    private readonly userService: UserService,
  ) {}

  @Post('text')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKListResponse(TextChatMessageResDto)
  @HttpCode(HttpStatus.OK)
  async createTextChatMessage(
    @ReqUser() currentUser: IUserPayload,
    @Body() textMessageData: TextCreateChatMessageBodyDto,
  ) {
    const chatroom = await this.chatroomservice.getChatroomById(
      textMessageData.chatroomId,
    );
    if (!chatroom)
      throw new BadRequestException(BadInputErrorBody.WRONG_CHATROOM_ID);

    const sender = chatroom
      .getMembers()
      .find((member) => member.getUserId() == currentUser.id);

    const textChatMessage = await this.chatMessageService.createTextChatMessage(
      sender,
      textMessageData,
    );

    return new ResWrapSingleDto(new TextChatMessageResDto(textChatMessage));
  }

  @Post('sticker')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKListResponse(StickerChatMessageResDto)
  @HttpCode(HttpStatus.OK)
  async createStickerChatMessage(
    @ReqUser() currentUser: IUserPayload,
    @Body() stickerChatMessageInput: CreateStickerChatMessageBodyDto,
  ) {
    const chatroom = await this.chatroomservice.getChatroomById(
      stickerChatMessageInput.chatroomId,
    );

    if (!chatroom)
      throw new BadRequestException(BadInputErrorBody.WRONG_CHATROOM_ID);

    const sender = chatroom
      .getMembers()
      .find((member) => member.getUserId() == currentUser.id);

    const stickerChatMessage =
      await this.chatMessageService.createStickerChatMessage(
        sender,
        stickerChatMessageInput,
      );

    return new ResWrapSingleDto(
      new StickerChatMessageResDto(stickerChatMessage),
    );
  }
}
