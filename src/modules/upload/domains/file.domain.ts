export class File {
  private readonly _id: string | null;
  private readonly _name: string;
  private readonly _originalName: string;
  private readonly _path: string;
  private readonly _size: string;
  private readonly _createdAt: Date;

  constructor(file: {
    id: string | null;
    name: string;
    originalName: string;
    path: string;
    size: string;
    createdAt: Date;
  }) {
    (this._id = file.id),
      (this._name = file.name),
      (this._originalName = file.originalName),
      (this._path = file.path),
      (this._size = file.size),
      (this._createdAt = file.createdAt);
  }
}
