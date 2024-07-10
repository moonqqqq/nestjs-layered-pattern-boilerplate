import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';

@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.AUTH}`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
