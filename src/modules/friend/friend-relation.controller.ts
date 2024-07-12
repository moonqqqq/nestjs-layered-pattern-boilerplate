import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FriendRelationService } from './friend-relation.service';
import { ApiBearerAuth, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { JwtAuthGuard } from '../../nestjs-utils/guards/jwt-auth.guard';
import { RenewFriendsBodyDto } from './dtos/renew-friends-body.dto';
import { UserService } from '../user/user.service';
import { IUserPayload } from '../../common/dtos/user-payload.dto';
import { ReqUser } from '../../nestjs-utils/decorators/user.decorator';

@ApiTags(`${API_ENDPOINT.FRIEND}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.FRIEND}`)
export class FriendRelationController {
  constructor(
    private readonly friendService: FriendRelationService,
    private readonly userService: UserService,
  ) {}

  /**
   * this is the process that runs internally in whatsapp
   * it renews friends using client's phonebook
   * So frontend sends phonebook data to backend to be saved on DB.
   */
  @Post('renew')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async addFriendsByPhoneBook(
    @ReqUser() currentUser: IUserPayload,
    @Body() { phoneNumbers }: RenewFriendsBodyDto,
  ) {
    // find user from the req.body
    const users = await this.userService.findUsersByPhoneNumbers(phoneNumbers);

    // if exists, add on friends data.
    await this.friendService.addFriendBulk(currentUser.id, users);
  }
}
