import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { ApiOKSingleResponse } from '../../nestjs-utils/decorators/custom-api-res/ok/api-ok-single-res.decorator';
import { ITokens } from '../../common/types/tokens.interface.';
import { BadRequestRes } from '../../nestjs-utils/decorators/exceptions/bad-request-res.decorator';
import { AuthErrorBody } from '../../common/error-bodies/auth-error-body';
import { SigninReqBodyDto } from './dtos/signin-req-body.dto';
import ResWrapper from '../../custom-utils/res-wrapper/res-wrapper.static';
import { SignupReqBodyDto } from './dtos/signup-req-body.dto';
import { ApiNoContentResponse } from '@nestjs/swagger';

@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.AUTH}`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async signup(@Body() dto: SignupReqBodyDto) {
    await this.authService.signup(dto.toDomain());
  }

  @Post('signin')
  @ApiOKSingleResponse(ITokens)
  @BadRequestRes(AuthErrorBody.WRONG_LOGIN_CREDENTIAL)
  @HttpCode(HttpStatus.OK)
  async signin(@Body() { loginId, password }: SigninReqBodyDto) {
    const tokens = await this.authService.signin(loginId, password);

    return ResWrapper.single(tokens);
  }
}
