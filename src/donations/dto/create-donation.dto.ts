import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, IsDate } from 'class-validator';
import {  Transform  } from 'class-transformer';

import { Types } from 'mongoose';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
  donor_id!: Types.ObjectId; 

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  donation_date!: Date; 

  @IsNotEmpty()
  @IsString()
  blood_type!: string; 

  @IsNotEmpty()
  @IsNumber()
  quantity!: number; 

  @IsOptional()
  @IsEnum(['pending', 'tested', 'approved', 'rejected'])
  status?: string; 

  @IsNotEmpty()
  @IsString()
  location!: string; 
}

