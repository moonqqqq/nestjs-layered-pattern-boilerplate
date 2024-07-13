import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../../user/domains/user.domain';
import { CHATROOM_KIND, TCHATROOM_KIND } from '../constants/chatroom.constant';
import { Chatroom } from '../domains/chatroom.domain';
import { IsEnum } from 'class-validator';
import { UserResDto } from '../../user/dtos/user-res.dto';

export class ChatroomResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _type: TCHATROOM_KIND;
  @Exclude() private readonly _title?: string;
  @Exclude() private readonly _members: User[];
  @Exclude() private readonly _currentUserId: string;

  constructor(chatroom: Chatroom, currentUserId: string) {
    this._id = chatroom.id;
    this._type = chatroom.type;
    this._title = chatroom.title;
    this._members = chatroom.members;
    this._currentUserId = currentUserId;
  }

  @ApiProperty({ example: '6a35589c-3e8c-4fd9-bda2-620d421dd5b9' })
  @Expose()
  get id(): string {
    return this._id;
  }

  // I think it should processed on the frontend side.
  @ApiProperty({ example: 'chatroom title' })
  @Expose()
  get title(): string {
    if (this._title) {
      return this._title;
    }

    const usersExceptMe = this._members.filter(
      (member) => member.id !== this._currentUserId,
    );

    return this._type === CHATROOM_KIND.ONE_TO_ONE
      ? usersExceptMe[0].userProfile.name
      : `${usersExceptMe.map((user) => user.userProfile.name)}`;
  }

  @ApiProperty({ example: CHATROOM_KIND.ONE_TO_ONE })
  @IsEnum(CHATROOM_KIND)
  @Expose()
  get type(): TCHATROOM_KIND {
    return this._type;
  }

  @ApiPropertyOptional({ type: [UserResDto] })
  @Expose()
  get members(): UserResDto[] {
    return this._members.map((member) => new UserResDto(member));
  }
}
