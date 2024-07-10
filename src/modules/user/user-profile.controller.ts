import { Controller } from '@nestjs/common';
import { UserProfileService } from './services/user-profile.service';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';

@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.USER_PROFILE}`)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
}
