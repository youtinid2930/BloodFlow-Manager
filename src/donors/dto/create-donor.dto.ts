<<<<<<< HEAD
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateDonorDto {
  @IsNotEmpty()
  @IsString()
  id: string; 

  @IsNotEmpty()
  @IsString()
  name: string; 

  @IsNotEmpty()
  @IsDateString()
  date_naiss: string; 

  @IsNotEmpty()
  @IsString()
  blood_type: string; 

  @IsNotEmpty()
  @IsString()
  contact_info: string; 

  @IsNotEmpty()
  @IsDateString()
  last_donation_date: string;
=======
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
  @IsEnum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], { message: 'Invalid' })
  blood_type!: string; 

  @IsNotEmpty()
  @IsString()
  contact_info!: string; 

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  last_donation_date!: Date;
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
}