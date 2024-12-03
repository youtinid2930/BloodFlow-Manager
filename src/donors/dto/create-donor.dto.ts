import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateDonorDto {
   @IsNotEmpty()
  @IsString()
  name!: string; 

  @IsNotEmpty()
  @IsDate()
  date_naiss!: Date;

  @IsNotEmpty()
  @IsString()
  blood_type!: string; 

  @IsNotEmpty()
  @IsString()
  contact_info!: string; 

  @IsNotEmpty()
  @IsDate()
  last_donation_date!: Date;
}