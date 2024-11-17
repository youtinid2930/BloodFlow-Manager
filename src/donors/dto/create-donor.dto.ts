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
}