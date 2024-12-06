import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateHistoriqueDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  related_ids?: string[];

  @IsOptional()
  @IsString()
  details?: string;
}
