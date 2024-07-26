import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmojiReactionService } from './emoji-reaction.service';
import { ApiBearerAuth, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { JwtAuthGuard } from '../../nestjs-utils/guards/jwt-auth.guard';
import { ReqUser } from '../../nestjs-utils/decorators/user.decorator';
import { IUserPayload } from '../../common/dtos/user-payload.dto';
import { SetEmojiReactionBodyDto } from './dtos/set-emoji-reaction-body.dto';
import { ChatroomService } from '../chatroom/chatroom.service';

@ApiTags(`${API_ENDPOINT.EMOJI_REACTION}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.EMOJI_REACTION}`)
export class EmojiReactionController {
  constructor(
    private readonly emojiReactionService: EmojiReactionService,
    private readonly chatroomService: ChatroomService,
  ) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.OK)
  async setEmojiReaction(
    @ReqUser() currentUser: IUserPayload,
    @Body() { chatMessageId, emojiType }: SetEmojiReactionBodyDto,
  ) {
    await this.chatroomService.checkAuthOnChatroomByChatMessageId(
      chatMessageId,
      currentUser.id,
    );

    await this.emojiReactionService.setEmojiReaction(currentUser.id, {
      chatMessageId: chatMessageId,
      type: emojiType,
    });
  }
}
