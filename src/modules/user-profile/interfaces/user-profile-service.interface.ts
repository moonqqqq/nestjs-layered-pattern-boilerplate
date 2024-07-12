import { IUser } from '../../user/interfaces/user.interface';

export abstract class IUserProfileService {
  createUser: () => IUser;
  getUserById: (id: string) => IUser;
}
