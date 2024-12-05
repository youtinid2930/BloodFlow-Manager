import { IsNotEmpty, IsString, IsArray } from 'class-validator';

import {Types} from 'mongoose';

export class CreateHistoriqueDto {
  @IsNotEmpty()
  @IsString()
  type!: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true }) // Ensures each element in the array is a string
  related_ids!: string[];

  @IsNotEmpty()
  @IsString()
  details!: string;
}
