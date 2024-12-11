import { IsNotEmpty, IsString, IsNumber, IsDate, IsEnum } from 'class-validator';
import {  Transform  } from 'class-transformer';



export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  requester_name!: string;

  @IsNotEmpty()
  @IsString()
  blood_type!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @IsNotEmpty()
  @IsEnum(['pending', 'approved', 'rejected'])
  status!: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  request_date!: Date;

  @IsNotEmpty()
  @IsString()
  contact_info!: string;
}
