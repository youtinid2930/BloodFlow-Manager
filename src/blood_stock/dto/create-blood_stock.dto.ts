// src/blood-stock/dto/create-blood-stock.dto.ts
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateBloodStockDto {
  @IsString()
  @IsNotEmpty()
  blood_type: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  storage_location: string;

  @IsDate()
  @IsNotEmpty()
  expiry_date: Date;

  @IsDate()
  @IsNotEmpty()
  last_update: Date;
}
