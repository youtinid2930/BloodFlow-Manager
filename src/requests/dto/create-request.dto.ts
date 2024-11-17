import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  requester_name: string;

  @IsNotEmpty()
  @IsString()
  blood_type: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(['pending', 'approved', 'rejected'])
  status: string;

  @IsNotEmpty()
  @IsDateString()
  request_date: string;

  @IsNotEmpty()
  @IsString()
  contact_info: string;
}
