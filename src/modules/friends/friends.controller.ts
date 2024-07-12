import { Controller } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';

@ApiTags(`${API_ENDPOINT.FRIEND}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.FRIEND}`)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}
}
