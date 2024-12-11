<<<<<<< HEAD
import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoriqueDto } from './create-historique.dto';
import { IsOptional, IsString, IsArray } from 'class-validator';
=======
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18

export class UpdateHistoriqueDto {
  @IsOptional()
  @IsString()
<<<<<<< HEAD
  id?: string;

  @IsOptional()
  @IsString()
=======
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  type?: string;

  @IsOptional()
  @IsArray()
<<<<<<< HEAD
  @IsString({ each: true }) // Ensures each element in the array is a string
=======
  @IsString({ each: true })
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  related_ids?: string[];

  @IsOptional()
  @IsString()
  details?: string;
}
