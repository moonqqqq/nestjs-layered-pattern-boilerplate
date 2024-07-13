import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { JwtAuthGuard } from '../../nestjs-utils/guards/jwt-auth.guard';
import { ApiOKSingleResponse } from '../../nestjs-utils/decorators/custom-api-res/ok/api-ok-single-res.decorator';
import { ReqUser } from '../../nestjs-utils/decorators/user.decorator';
import { IUserPayload } from '../../common/dtos/user-payload.dto';
import { CreateOneToOneChatroom } from './dtos/create-one-to-one-chatroom-body.dto';
import {
  ResWrapListDto,
  ResWrapSingleDto,
} from '../../common/dtos/res-wrappers.dto';
import { ChatroomResDto } from './dtos/chatroom-res.dto';
import { CreateGroupChatroom } from './dtos/create-group-chatroom-body.dto';
import { ApiOKListResponse } from '../../nestjs-utils/decorators/custom-api-res/ok/api-ok-list-res.decorator';
import { UserService } from '../user/user.service';

@ApiTags(`${API_ENDPOINT.CHATROOM}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.CHATROOM}`)
export class ChatroomController {
  constructor(
    private readonly chatroomService: ChatroomService,
    private readonly userService: UserService,
  ) {}

  @Get('my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKListResponse(ChatroomResDto)
  @HttpCode(HttpStatus.OK)
  async getMyChatrooms(@ReqUser() currentUser: IUserPayload) {
    const chatrooms = await this.chatroomService.getMyChatrooms(currentUser.id);

    return new ResWrapListDto(
      chatrooms.map((chatroom) => new ChatroomResDto(chatroom, currentUser.id)),
    );
  }

  @Post('one-to-one')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKSingleResponse(ChatroomResDto)
  @HttpCode(HttpStatus.OK)
  async createOneToOneChatroom(
    @ReqUser() currentUser: IUserPayload,
    @Body() { userId }: CreateOneToOneChatroom,
  ) {
    const alreadyExistingChatroom =
      await this.chatroomService.checkChatroomExists([currentUser.id, userId]);
    if (alreadyExistingChatroom) {
      return new ResWrapSingleDto(
        new ChatroomResDto(alreadyExistingChatroom, currentUser.id),
      );
    }

    const users = await Promise.all(
      [currentUser.id, userId].map((userId) =>
        this.userService.findById(userId),
      ),
    );

    const chatroom = await this.chatroomService.createOneToOneChatroom(
      currentUser.id,
      users,
    );

    return new ResWrapSingleDto(new ChatroomResDto(chatroom, currentUser.id));
  }

  @Post('group')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKListResponse(ChatroomResDto)
  @HttpCode(HttpStatus.OK)
  async createGroupChatroom(
    @ReqUser() currentUser: IUserPayload,
    @Body() { userIds }: CreateGroupChatroom,
  ) {
    const alreadyExistingChatroom =
      await this.chatroomService.checkChatroomExists([
        currentUser.id,
        ...userIds,
      ]);
    if (alreadyExistingChatroom) {
      return new ResWrapSingleDto(
        new ChatroomResDto(alreadyExistingChatroom, currentUser.id),
      );
    }

    const users = await Promise.all(
      [currentUser.id, ...userIds].map((userId) =>
        this.userService.findById(userId),
      ),
    );

    const newGroupChatroom = await this.chatroomService.createGroupChatroom(
      currentUser.id,
      users,
    );

    return new ResWrapSingleDto(
      new ChatroomResDto(newGroupChatroom, currentUser.id),
    );
  }
}
