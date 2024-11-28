import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodStockDto } from './create-blood_stock.dto';
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';


export class UpdateBloodStockDto extends PartialType(CreateBloodStockDto) {

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
  expiry_date?: Date;

  @IsOptional()
  @IsDateString()
  last_update?: Date;
}
