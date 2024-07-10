import { IUser } from './user.interface';

export abstract class IUserProfileService {
  createUser: () => IUser;
  getUserById: (id: string) => IUser;
}
