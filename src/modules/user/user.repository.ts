import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { UserProfile } from './domains/user-profile.domain';
import { File } from '../upload/domains/file.domain';
import { User } from './domains/user.domain';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByLoginId(loginId: string): Promise<User> {
    const userEntity = await this.prisma.userEntity.findFirst({
      where: {
        loginId,
      },
      include: {
        userProfile: {
          include: {
            profileImage: true,
          },
        },
      },
    });

    const profileImage = new File(userEntity.userProfile.profileImage);

    const userProfile = new UserProfile({
      ...userEntity.userProfile,
      profileImage,
    });

    const user = new User({
      ...userEntity,
      userProfile,
    });

    return user;
  }
}
