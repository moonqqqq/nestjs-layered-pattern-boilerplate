import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReqUser } from '../../nestjs-utils/decorators/user.decorator';
import { IUserPayload } from '../../common/dtos/user-payload.dto';
import { JwtAuthGuard } from '../../nestjs-utils/guards/jwt-auth.guard';
import { ApiOKSingleResponse } from '../../nestjs-utils/decorators/custom-api-res/ok/api-ok-single-res.decorator';
import { ResWrapSingleDto } from '../../common/dtos/res-wrappers.dto';
import { UpdateUserProfileDto } from './dtos/update-user-profile-body.dto';
import { UserProfileResDto } from './dtos/user-profile-res.dto';

@ApiTags(`${API_ENDPOINT.USER_PROFILE}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.USER_PROFILE}`)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get('my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKSingleResponse(UserProfileResDto)
  @HttpCode(HttpStatus.OK)
  async getMy(
    @ReqUser() currentUser: IUserPayload,
  ): Promise<ResWrapSingleDto<UserProfileResDto>> {
    const userProfile = await this.userProfileService.getUserById(
      currentUser.id,
    );

    return new ResWrapSingleDto(new UserProfileResDto(userProfile));
  }

  @Patch('my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOKSingleResponse(UserProfileResDto)
  @HttpCode(HttpStatus.OK)
  async updateMyProfile(
    @ReqUser() currentUser: IUserPayload,
    @Body() payload: UpdateUserProfileDto,
  ): Promise<ResWrapSingleDto<UserProfileResDto>> {
    const userProfile = await this.userProfileService.updateUserProfile(
      currentUser.id,
      payload,
    );

    return new ResWrapSingleDto(new UserProfileResDto(userProfile));
  }
}
