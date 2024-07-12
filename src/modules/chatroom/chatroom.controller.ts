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
import { CreateOneToOneChatroomResDto } from './dtos/create-one-to-one-chatroom-res.dto';

@ApiTags(`${API_ENDPOINT.CHATROOM}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.CHATROOM}`)
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Post('one-to-one')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKSingleResponse(CreateOneToOneChatroomResDto)
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
      new CreateOneToOneChatroomResDto(chatroom, currentUser.id),
    );
  }
}
