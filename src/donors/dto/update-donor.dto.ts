import { PartialType } from '@nestjs/mapped-types';
import { CreateDonorDto } from './create-donor.dto';
import { IsOptional, IsString, IsDate,IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
export class UpdateDonorDto {

  @IsOptional()
  @IsString()
  name?: string; 

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_naiss?: Date; 

  @IsOptional()
  @IsEnum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], { message: 'Invalid' })
  blood_type?: string; 

  @IsOptional()
  @IsString()
  phone_number?: string; 

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  last_donation_date?: Date; 
  
}
