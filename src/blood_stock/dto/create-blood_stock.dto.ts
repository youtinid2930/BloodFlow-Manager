<<<<<<< HEAD
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
=======
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
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
}
