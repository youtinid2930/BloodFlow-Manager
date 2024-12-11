<<<<<<< Updated upstream
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, IsDateString } from 'class-validator';
=======
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, IsDate } from 'class-validator';
import {  Transform  } from 'class-transformer';

import { Types } from 'mongoose';
>>>>>>> Stashed changes

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
<<<<<<< Updated upstream
  donor_id: string; // Foreign key referencing the donor

  @IsNotEmpty()
  @IsDateString()
  donation_date: string; // ISO date string format

  @IsNotEmpty()
  @IsString()
  blood_type: string; // Blood type (e.g., A+, O-, etc.)

  @IsNotEmpty()
  @IsNumber()
  quantity: number; // Quantity in milliliters or units

  @IsOptional()
  @IsEnum(['pending', 'tested', 'approved', 'rejected'])
  status?: string; // Default is pending

  @IsNotEmpty()
  @IsString()
  location: string; // Location of donation
=======
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
>>>>>>> Stashed changes
}

