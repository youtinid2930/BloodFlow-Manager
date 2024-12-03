import { PartialType } from '@nestjs/mapped-types';
import { CreateDonorDto } from './create-donor.dto';
import { IsOptional, IsString, IsDate } from 'class-validator';
export class UpdateDonorDto {

  @IsOptional()
  @IsString()
  name?: string; 

  @IsOptional()
  @IsDate()
  date_naiss?: Date; 

  @IsOptional()
  @IsString()
  blood_type?: string; 

  @IsOptional()
  @IsString()
  contact_info?: string; 

  @IsOptional()
  @IsDate()
  last_donation_date?: Date; 
  
}
