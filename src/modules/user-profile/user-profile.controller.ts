import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReqUser } from '../../nestjs-utils/decorators/user.decorator';
import { IUserPayload } from '../../common/dtos/user-payload.dto';
import { JwtAuthGuard } from '../../nestjs-utils/guards/jwt-auth.guard';
import { UserResDto } from './dtos/user-res.dto';
import { ApiOKSingleResponse } from '../../nestjs-utils/decorators/custom-api-res/ok/api-ok-single-res.decorator';
import { ResWrapSingleDto } from '../../common/dtos/res-wrappers.dto';

@ApiTags(`${API_ENDPOINT.USER_PROFILE}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.USER_PROFILE}`)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get('my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKSingleResponse(UserResDto)
  @HttpCode(HttpStatus.OK)
  async signup(
    @ReqUser() currentUser: IUserPayload,
  ): Promise<ResWrapSingleDto<UserResDto>> {
    const user = await this.userProfileService.getUserById(currentUser.id);

    return new ResWrapSingleDto(new UserResDto(user));
  }
}
