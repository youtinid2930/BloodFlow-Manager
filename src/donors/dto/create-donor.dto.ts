import { IsNotEmpty, IsString, IsDate,IsEnum } from 'class-validator';
import {  Transform  } from 'class-transformer';

export class CreateDonorDto {
  @IsNotEmpty()
  @IsString()
  name!: string; 

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_naiss!: Date;

  

  @IsNotEmpty()
  @IsEnum(["Ap", "Am", "Bp", "Bm", "ABp", "ABm", "Op", "Om"], { message: 'Invalid BloodType' })
  blood_type!: string; 

  @IsNotEmpty()
  @IsString()
  contact_info!: string; 

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  last_donation_date!: Date;
}