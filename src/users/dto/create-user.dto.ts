import { IsEmail, IsNotEmpty, MinLength, IsEmpty, IsEnum } from 'class-validator';
import { Types } from 'mongoose';
import { Role } from '../../roles/enum/role.enum';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsEmpty()
  donor_id!: Types.ObjectId;

  @IsEnum(Role)
  role!: Role;
}
