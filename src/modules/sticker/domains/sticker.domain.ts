import { InputFile } from '../../upload/domains/file.domain';
import { TStickerQueryIncludeStatement } from '../types/sticker-entity-include.type';

export class Sticker {
  readonly id?: string;
  readonly name: string;
  readonly file: InputFile;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(sticker: {
    readonly id?: string;
    readonly name: string;
    readonly file: InputFile;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    this.id = sticker.id;
    this.name = sticker.name;
    this.file = sticker.file;
    this.createdAt = sticker.createdAt;
    this.updatedAt = sticker.updatedAt;
  }

  static fromEntity(_stickerEntity: TStickerQueryIncludeStatement) {
    const { file: fileEntity, ...stickerEntity } = _stickerEntity;

    let file: InputFile;
    if (fileEntity) file = new InputFile(fileEntity);

    return new Sticker({
      ...stickerEntity,
      file,
    });
  }

  getId() {
    return this.id;
  }
}
