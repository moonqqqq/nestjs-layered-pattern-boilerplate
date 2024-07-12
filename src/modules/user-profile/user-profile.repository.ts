import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { UserProfile } from '../user-profile/domains/user-profile.domain';
import { Prisma, UserProfileEntity } from '@prisma/client';

@Injectable()
export class UserProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<UserProfile> {
    const userProfileEntity = await this.prisma.userProfileEntity.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        profileImage: true,
      },
    });

    if (!userProfileEntity) return null;

    return UserProfile.fromEntity(userProfileEntity);
  }

  async save(userProfile: UserProfile): Promise<UserProfile> {
    const { id, name, phoneNumber, profileImage } = userProfile;

    const userProfileData: Prisma.UserProfileEntityCreateInput = {
      id,
      name,
      phoneNumber,
    };

    if (profileImage) {
      userProfileData.profileImage = {
        connect: {
          id: profileImage.id,
        },
      };
    }

    let newUserProfile: UserProfileEntity;
    if (!id) {
      newUserProfile = await this.prisma.userProfileEntity.create({
        data: userProfileData,
      });
    } else {
      newUserProfile = await this.prisma.userProfileEntity.update({
        where: { id },
        data: userProfileData,
      });
    }

    return UserProfile.fromEntity(newUserProfile);
  }
}
