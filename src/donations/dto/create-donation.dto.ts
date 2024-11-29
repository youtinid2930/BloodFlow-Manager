import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, IsDateString } from 'class-validator';

import { Types } from 'mongoose';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
  donor_id!: Types.ObjectId; 

  @IsNotEmpty()
  @IsDateString()
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

