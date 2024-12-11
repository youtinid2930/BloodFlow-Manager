import { PartialType } from '@nestjs/mapped-types';
import { CreateDonorDto } from './create-donor.dto';
<<<<<<< HEAD

import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateDonorDto {
  @IsOptional()
  @IsString()
  id?: string; 
=======
import { IsOptional, IsString, IsDate,IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
export class UpdateDonorDto {
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18

  @IsOptional()
  @IsString()
  name?: string; 

  @IsOptional()
<<<<<<< HEAD
  @IsDateString()
  date_naiss?: string; 

  @IsOptional()
  @IsString()
=======
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_naiss?: Date; 

  @IsOptional()
  @IsEnum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], { message: 'Invalid' })
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  blood_type?: string; 

  @IsOptional()
  @IsString()
  contact_info?: string; 

  @IsOptional()
<<<<<<< HEAD
  @IsDateString()
  last_donation_date?: string; 
=======
  @Transform(({ value }) => new Date(value))
  @IsDate()
  last_donation_date?: Date; 
  
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
}
