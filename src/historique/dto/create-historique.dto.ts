import { IsNotEmpty, IsString, IsArray } from 'class-validator';

<<<<<<< HEAD
export class CreateHistoriqueDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  type: string;
=======
import {Types} from 'mongoose';

export class CreateHistoriqueDto {
  @IsNotEmpty()
  @IsString()
  type!: string;
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true }) // Ensures each element in the array is a string
<<<<<<< HEAD
  related_ids: string[];

  @IsNotEmpty()
  @IsString()
  details: string;
=======
  related_ids!: string[];

  @IsNotEmpty()
  @IsString()
  details!: string;
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
}
