import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../../user/domains/user.domain';

export class TaggedUserResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _name: string;

  constructor(taggedUser: User) {
    this._id = taggedUser.id;
    this._name = taggedUser.userProfile.name;
  }

  @ApiProperty({ example: '6a35589c-3e8c-4fd9-bda2-620d421dd5b9' })
  @Expose()
  get id(): string {
    return this._id;
  }

  @ApiProperty({ example: 'kim' })
  @Expose()
  get name(): string {
    return this._name;
  }
}
