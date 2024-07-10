export class File {
  private readonly _id: string | null;
  private readonly _name: string;
  private readonly _originalName: string;
  private readonly _path: string;
  private readonly _size: string;
  private readonly _createdAt: Date;

  constructor(
    id: string | null,
    name: string,
    originalName: string,
    path: string,
    size: string,
    createdAt: Date,
  ) {
    (this._id = id),
      (this._name = name),
      (this._originalName = originalName),
      (this._path = path),
      (this._size = size),
      (this._createdAt = createdAt);
  }
}
