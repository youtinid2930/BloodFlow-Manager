import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodStockDto } from './create-blood_stock.dto';
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class UpdateBloodStockDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  blood_type?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  storage_location?: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @IsOptional()
  @IsDateString()
  last_update?: string;
}
