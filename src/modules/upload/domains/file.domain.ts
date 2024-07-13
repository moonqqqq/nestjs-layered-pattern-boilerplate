export class InputFile {
  readonly id: string | null;
  readonly name: string;
  readonly originalName: string;
  readonly path: string;
  readonly size: string;
  readonly createdAt: Date;

  constructor(file: {
    id?: string;
    name?: string;
    originalName?: string;
    path?: string;
    size?: string;
    createdAt?: Date;
  }) {
    (this.id = file.id),
      (this.name = file.name),
      (this.originalName = file.originalName),
      (this.path = file.path),
      (this.size = file.size),
      (this.createdAt = file.createdAt);
  }

  fromEntity(inputFileEntity: {
    id: string;
    name: string;
    originamName: string;
    path: string;
    size: string;
    createdAt: Date;
  }) {
    return new InputFile({
      id: inputFileEntity.id,
      name: inputFileEntity.name,
      originalName: inputFileEntity.originamName,
      path: inputFileEntity.path,
      size: inputFileEntity.size,
      createdAt: inputFileEntity.createdAt,
    });
  }
}
