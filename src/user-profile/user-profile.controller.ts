import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { API_ENDPOINT, API_VERSION } from '../common/constants/api-versions';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { ApiOKSingleResponse } from '../nestjs-utils/decorators/custom-api-res/ok/api-ok-single-res.decorator';
import { ReqUser } from '../nestjs-utils/decorators/user.decorator';
import { IUserPayload } from '../common/dtos/user-payload.dto';
import { JwtAuthGuard } from '../nestjs-utils/guards/jwt-auth.guard';
import ResWrapper from '../custom-utils/res-wrapper/res-wrapper.static';

@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.USER_PROFILE}`)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get('my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // @ApiOKSingleResponse()
  @HttpCode(HttpStatus.OK)
  async signup(@ReqUser() currentUser: IUserPayload) {
    // get user
    const user = await this.userProfileService.getUserById(currentUser.id);

    return ResWrapper.single(user);
  }
}
