import { IsOptional, IsString, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class UpdateRequestDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  requester_name?: string;

  @IsOptional()
  @IsString()
  blood_type?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsEnum(['pending', 'approved', 'rejected'])
  status?: string;

  @IsOptional()
  @IsDateString()
  request_date?: string;

  @IsOptional()
  @IsString()
  contact_info?: string;
}
