import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
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
}

