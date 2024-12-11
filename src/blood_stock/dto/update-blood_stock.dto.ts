import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodStockDto } from './create-blood_stock.dto';
<<<<<<< HEAD

export class UpdateBloodStockDto extends PartialType(CreateBloodStockDto) {}
=======
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import {  Transform  } from 'class-transformer';


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
  @Transform(({ value }) => new Date(value))
  expiry_date?: Date;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  last_update?: Date;
}
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
