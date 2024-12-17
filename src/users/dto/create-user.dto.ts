import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  donor_id!: Types.ObjectId;
}
