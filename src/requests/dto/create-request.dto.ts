import { IsNotEmpty, IsString, IsNumber, IsDateString, IsEnum } from 'class-validator';

import { Types } from 'mongoose';


export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  requester_name!: string;

  @IsNotEmpty()
  @IsString()
  blood_type!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @IsNotEmpty()
  @IsEnum(['pending', 'approved', 'rejected'])
  status!: string;

  @IsNotEmpty()
  @IsDateString()
  request_date!: Date;

  @IsNotEmpty()
  @IsString()
  contact_info!: string;
}
