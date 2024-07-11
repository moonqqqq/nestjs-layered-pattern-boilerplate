// import { ApiProperty } from '@nestjs/swagger';
// import { Exclude, Expose } from 'class-transformer';

// export class UserProfileResDto {
//     @Exclude() private readonly _id: string;
//     @Exclude() private readonly _loginId: string;
//     @Exclude() private readonly _password: string;
//     // @Exclude() private readonly _userProfile: number;
//     @Exclude() private readonly _createdAt: Date;
//     @Exclude() private readonly _updatedAt: Date;

//     @ApiProperty({ example: "6a35589c-3e8c-4fd9-bda2-620d421dd5b9" })
//     @Expose()
//     get id(): string {
//         return this._id;
//     }

//     @ApiProperty({ example: 'loginid123' })
//     @Expose()
//     get loginId(): string {
//         return this._loginId;
//     };

//     @ApiProperty({ example: 'loginid123' })
//     @Expose()
//     get createdAt(): Date {
//         return this._createdAt;
//     };

//     @ApiProperty({ example: 'loginid123' })
//     @Expose()
//     get updatedAt(): Date {
//         return this._createdAt;
//     };
// }
