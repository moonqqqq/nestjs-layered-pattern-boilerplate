import {
  Body,
  Controller,
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
import { ResWrapSingleDto } from '../../common/dtos/res-wrappers.dto';
import { CreateChatroomResDto } from './dtos/create-chatroom-res.dto';
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

  @Post('one-to-one')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKSingleResponse(CreateChatroomResDto)
  @HttpCode(HttpStatus.OK)
  async createOneToOneChatroom(
    @ReqUser() currentUser: IUserPayload,
    @Body() { userId }: CreateOneToOneChatroom,
  ) {
    const chatroom = await this.chatroomService.createOneToOneChatroom(
      currentUser.id,
      userId,
    );

    return new ResWrapSingleDto(
      new CreateChatroomResDto(chatroom, currentUser.id),
    );
  }

  @Post('group')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKListResponse(CreateChatroomResDto)
  @HttpCode(HttpStatus.OK)
  async createGroupChatroom(
    @ReqUser() currentUser: IUserPayload,
    @Body() { userIds }: CreateGroupChatroom,
  ) {
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
      new CreateChatroomResDto(newGroupChatroom, currentUser.id),
    );
  }
}
