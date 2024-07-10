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

    const profileImage = new File(
      userEntity.userProfile.profileImage.id,
      userEntity.userProfile.profileImage.name,
      userEntity.userProfile.profileImage.originalName,
      userEntity.userProfile.profileImage.path,
      userEntity.userProfile.profileImage.size,
      userEntity.userProfile.profileImage.createdAt,
    );

    const userProfile = new UserProfile(
      userEntity.userProfile.name,
      userEntity.userProfile.phoneNumber,
      profileImage,
    );

    const user = new User(
      userEntity.id,
      userEntity.loginId,
      userEntity.password,
      userProfile,
      userEntity.createdAt,
      userEntity.updatedAt,
    );

    return user;
  }
}
