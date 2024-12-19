import { IsEmail, IsNotEmpty, MinLength, IsEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsEmpty()
  donor_id!: Types.ObjectId;
}
