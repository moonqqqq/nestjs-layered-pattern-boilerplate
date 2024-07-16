import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ApiBearerAuth, ApiTags, IntersectionType } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../nestjs-utils/guards/jwt-auth.guard';
import { ApiOKListResponse } from '../../nestjs-utils/decorators/custom-api-res/ok/api-ok-list-res.decorator';
import { ReqUser } from '../../nestjs-utils/decorators/user.decorator';
import { IUserPayload } from '../../common/dtos/user-payload.dto';
import { TextCreateChatMessageBodyDto } from './dtos/create-text-chat-message-body.dto';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { ChatroomService } from '../chatroom/chatroom.service';
import { BadInputErrorBody } from '../../common/error-bodies/bad-input-error-body';
import { TextChatMessageResDto } from './dtos/text-chat-message-res.dto';
import {
  ResWrapListAndMetadataDto,
  ResWrapSingleDto,
} from '../../common/dtos/res-wrappers.dto';
import { CreateStickerChatMessageBodyDto } from './dtos/create- sticker-chat-message-body.dto';
import { StickerChatMessageResDto } from './dtos/sticker-chat-message-res.dto';
import { GetChatMessagesQueryDto } from './dtos/get-chat-messages-query.dto';
import { TextChatMessage } from './domains/text-chat-message.domain';
import { ApiOKListAndMetadataResponse } from '../../nestjs-utils/decorators/custom-api-res/ok/api-ok-list-and-meta-res.decorator';
import { InfiniteScrollMetadataResDTO } from '../../custom-utils/pagination/dtos/infinite-scroll-res.dto';

@ApiTags(`${API_ENDPOINT.CHAT_MESSAGE}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.CHAT_MESSAGE}`)
export class ChatMessageController {
  constructor(
    private readonly chatMessageService: ChatMessageService,
    private readonly chatroomservice: ChatroomService,
  ) {}

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKListAndMetadataResponse(
    InfiniteScrollMetadataResDTO,
    IntersectionType(TextChatMessageResDto, StickerChatMessageResDto),
  )
  @HttpCode(HttpStatus.OK)
  async getChatMessage(
    @ReqUser() currentUser: IUserPayload,
    @Query() { chatroomId, lastItemCreatedAt }: GetChatMessagesQueryDto,
  ) {
    const chatroom = await this.chatroomservice.getChatroomById(chatroomId);
    if (!chatroom)
      throw new BadRequestException(BadInputErrorBody.WRONG_CHATROOM_ID);

    const chatMessages = await this.chatMessageService.getChatMessages(
      currentUser.id,
      chatroomId,
      lastItemCreatedAt ? new Date(lastItemCreatedAt) : undefined,
    );

    // return chatMessages;
    return new ResWrapListAndMetadataDto(
      {
        hasNext: chatMessages.hasNext,
      },
      chatMessages.chatMessages.map((message) => {
        return message instanceof TextChatMessage
          ? new TextChatMessageResDto(message)
          : new StickerChatMessageResDto(message);
      }),
    );
  }

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

    // Send push notification
    // pushManager.taggedMessage(textChatMessage)

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

    // Send push notification
    // pushManager.taggedMessage(textChatMessage)

    return new ResWrapSingleDto(
      new StickerChatMessageResDto(stickerChatMessage),
    );
  }
}
