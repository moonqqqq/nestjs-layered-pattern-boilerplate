import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';

@Injectable()
export class FriendRepository {
  constructor(private readonly prisma: PrismaService) {}
}
