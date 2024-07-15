import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { InputFile } from './domains/file.domain';

@Injectable()
export class InputFileRepository {
  constructor(private readonly prisma: PrismaService) {}

  private inputFileQueryIncludeStatement = {};

  async findById(id: string): Promise<InputFile> {
    const fileEntity = await this.prisma.inputFileEntity.findFirst({
      where: {
        id,
      },
      include: this.inputFileQueryIncludeStatement,
    });

    if (!fileEntity) return null;

    return InputFile.fromEntity(fileEntity);
  }
}
