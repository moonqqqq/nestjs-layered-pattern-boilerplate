import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { User } from './domains/user.domain';
import { userQueryIncludeStatement } from './types/user-entity-include.type';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: change to save()
  async create(user: User) {
    const createdUserProfileEntity = await this.prisma.userProfileEntity.create(
      {
        data: {
          name: user.userProfile.name,
          phoneNumber: user.userProfile.phoneNumber,
        },
      },
    );

    const createdUserEntity = await this.prisma.userEntity.create({
      data: {
        loginId: user.loginId,
        password: user.password,
        userProfile: {
          connect: {
            id: createdUserProfileEntity.id,
          },
        },
      },
      include: userQueryIncludeStatement,
    });

    return User.fromEntity(createdUserEntity);
  }

  async findByLoginId(loginId: string): Promise<User> {
    const userEntity = await this.prisma.userEntity.findFirst({
      where: {
        loginId,
      },
      include: userQueryIncludeStatement,
    });

    return User.fromEntity(userEntity);
  }

  async checkLoginIdDuplicate(loginId: string): Promise<boolean> {
    const userEntity = await this.prisma.userEntity.findFirst({
      where: {
        loginId,
      },
    });

    return !!userEntity;
  }

  async findById(id: string): Promise<User> {
    const userEntity = await this.prisma.userEntity.findFirst({
      where: {
        id,
      },
      include: userQueryIncludeStatement,
    });

    if (!userEntity) return null;

    return User.fromEntity(userEntity);
  }

  async findUsersByPhoneNumbers(phoneNumbers: string[]) {
    const userEntities = await this.prisma.userEntity.findMany({
      where: {
        userProfile: {
          phoneNumber: {
            in: phoneNumbers,
          },
        },
      },
      include: userQueryIncludeStatement,
    });

    return userEntities.map((userEntity) => User.fromEntity(userEntity));
  }
}
