import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import {  Transform  } from 'class-transformer';


export class CreateBloodStockDto {
  
  @IsString()
  @IsNotEmpty()
  blood_type!: string;

  @IsNumber()
  @IsNotEmpty()
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  storage_location!: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  expiry_date!: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  last_update!: Date;
}
