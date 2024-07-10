export class InputFile {
  private readonly _id: string | null;
  private readonly _name: string;
  private readonly _originalName: string;
  private readonly _path: string;
  private readonly _size: string;
  private readonly _createdAt: Date;

  constructor(file: {
    id: string | null;
    name?: string;
    originalName?: string;
    path?: string;
    size?: string;
    createdAt?: Date;
  }) {
    (this._id = file.id),
      (this._name = file.name),
      (this._originalName = file.originalName),
      (this._path = file.path),
      (this._size = file.size),
      (this._createdAt = file.createdAt);
  }

  toEntity() {
    return {
      id: this._id || null,
      name: this._name,
      phoneNumber: this._originalName,
      profileImage: this._path,
      size: this._size,
      createdAt: this._createdAt,
    };
  }
}
