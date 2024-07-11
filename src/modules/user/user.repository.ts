import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { User } from './domains/user.domain';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User) {
    const userEntity = user.toEntity();

    const createdUserProfileEntity = await this.prisma.userProfileEntity.create(
      {
        data: {
          name: userEntity.userProfile.name,
          phoneNumber: userEntity.userProfile.phoneNumber,
        },
      },
    );

    const createdUserEntity = await this.prisma.userEntity.create({
      data: {
        ...userEntity,
        userProfile: {
          connect: {
            id: createdUserProfileEntity.id,
          },
        },
      },
      include: {
        userProfile: {
          include: {
            profileImage: true,
          },
        },
      },
    });

    return User.fromEntity(createdUserEntity);
  }

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

    return User.fromEntity(userEntity);
  }

  async findById(id: string): Promise<User> {
    const userEntity = await this.prisma.userEntity.findFirst({
      where: {
        id,
      },
      include: {
        userProfile: {
          include: {
            profileImage: true,
          },
        },
      },
    });

    return User.fromEntity(userEntity);
  }
}
