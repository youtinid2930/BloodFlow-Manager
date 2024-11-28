import { PartialType } from '@nestjs/mapped-types';
import { CreateDonorDto } from './create-donor.dto';

import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateDonorDto {
  @IsOptional()
  @IsString()
  id?: string; 

  @IsOptional()
  @IsString()
  name?: string; 

  @IsOptional()
  @IsDateString()
  date_naiss?: string; 

  @IsOptional()
  @IsString()
  blood_type?: string; 

  @IsOptional()
  @IsString()
  contact_info?: string; 

  @IsOptional()
  @IsDateString()
  last_donation_date?: string; 
}
