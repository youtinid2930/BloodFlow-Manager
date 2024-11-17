import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoriqueDto } from './create-historique.dto';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateHistoriqueDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Ensures each element in the array is a string
  related_ids?: string[];

  @IsOptional()
  @IsString()
  details?: string;
}
