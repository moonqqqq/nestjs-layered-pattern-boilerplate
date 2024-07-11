export class InputFile {
  private readonly id: string | null;
  private readonly name: string;
  private readonly originalName: string;
  private readonly path: string;
  private readonly size: string;
  private readonly createdAt: Date;

  constructor(file: {
    id: string | null;
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

  toEntity() {
    return {
      id: this.id || null,
      name: this.name,
      phoneNumber: this.originalName,
      profileImage: this.path,
      size: this.size,
      createdAt: this.createdAt,
    };
  }
}
